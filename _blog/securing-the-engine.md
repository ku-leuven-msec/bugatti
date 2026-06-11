---
layout: blog
title: "Securing the Engine: Attacking and Defending GitHub Actions Pipelines"
date: 2026-06-11
author: "G. R. Benedetti and N. Van Es (VUB-Soft)"
reading_time: "8 min read"
excerpt: "A structural primer on GitHub Actions security, common CI/CD pipeline attack paths, and practical hardening measures for embedded software teams."
---

Continuous Integration and Continuous Delivery (CI/CD) has completely redefined modern software engineering. By moving compilation, testing, and compliance checks earlier in the development lifecycle, a core philosophy of "shifting left", automated pipelines help engineering teams catch bugs and security flaws long before code ever reaches a production environment.
But this automation introduces a critical irony that many development teams overlook: **the pipeline built to secure your software can easily become your weakest security link**.

Because platforms like GitHub Actions handle highly sensitive operations, such as compiling firmware binaries, interacting with cloud infrastructure, and signing release packages, they have become prime targets for software supply chain exploits. If an attacker compromises your pipeline engine, they inherit the keys to your entire software kingdom.

<div style="margin: 1.75em 0 2em 0; padding: 1.1em 1.25em; border-left: 6px solid #1abc9c; background: #f4fcfa; border-radius: 10px; box-shadow: 0 2px 10px rgba(26,188,156,0.06);">
  <strong style="color: #0b5f63;">Core point:</strong> a compromised CI/CD pipeline is not just a tooling failure. It becomes a trusted path for shipping malicious code, leaking secrets, and tampering with releases.
</div>


This post provides a quick structural primer on GitHub Actions before breaking down the critical architectural flaws commonly found in pipelines, how attackers exploit them, and how you can systematically defend against them.

## A Quick Primer: The Anatomy of GitHub Actions

To understand how pipelines get broken, we first need to understand how they are put together. In GitHub Actions, workflows are defined using YAML syntax and live within the `.github/workflows/` directory of your repository.

Anatomy of a workflow:

- **Workflows**: The top-level automated process. Workflows are initiated by specific triggers (events), such as a code push, a pull request creation, a scheduled cron job, or a `pull_request_target` event.
- **Jobs**: A set of execution steps that run on an isolated instance called a **Runner** (which can be GitHub-hosted or self-hosted infrastructure). By default, multiple jobs inside a single workflow run concurrently in parallel unless explicit dependencies (`needs:`) are defined.
- **Steps**: Individual tasks executed sequentially inside a job. Steps can execute raw shell commands (`run:`) or call **Reusable Actions**, modular extensions typically pulled from the GitHub Marketplace to simplify actions like checking out a repository or setting up a toolchain.

While this modular framework provides immense flexibility, it also means a single misconfigured step can break open the security boundary of the entire system.


## Critical Vulnerability Classes & How to Defend Them

<div style="margin: 0.75em 0 1.75em 0; padding: 0.95em 1.15em; border-left: 4px solid #0078b4; background: #f7fbfe; border-radius: 8px;">
  <strong>Think in trust boundaries:</strong> every workflow, job, action, token, and runner is part of your attack surface.
</div>

This analysis explores how standard development habits, often copied straight from online tutorials, can inadvertently expose your delivery pipeline to critical exploits. Let's break down the major vulnerability categories.

### 1. Unpinned Actions (Supply Chain Pollution)

The most common supply chain threat stems from how reusable actions are pulled into workflows. Many teams reference community actions using mutable version pointers, such as release tags or branch names:

<div style="margin: 1em 0 1.5em 0; padding: 1em 1.15em; background: #f7fafc; border: 1px solid #d9e6ef; border-radius: 10px; overflow-x: auto;">
  <div style="font-size: 0.78em; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #5b7285; margin-bottom: 0.75em;">Vulnerable Configuration</div>
  <pre style="margin: 0; font-family: SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.95em; line-height: 1.6; color: #1f2933;"><code>uses: actions/checkout@v4
uses: third-party/security-scanner@v2</code></pre>
</div>

**The Attack**: Release tags are entirely mutable. If an upstream maintainer's account is compromised via phishing or credential reuse, an attacker can silently alter the repository's history and force-push the `v2` tag to point to a weaponized commit. The next time your pipeline runs, it fetches and executes the malicious code without throwing any warnings.

**The Mitigation**: Shift your trust from mutable tags to immutable 40-character cryptographic commit SHAs. A SHA pin cannot be manipulated or updated upstream. Pair it with an inline comment to maintain human readability for your development team:

<div style="margin: 1em 0 1.5em 0; padding: 1em 1.15em; background: #f7fafc; border: 1px solid #d9e6ef; border-radius: 10px; overflow-x: auto;">
  <div style="font-size: 0.78em; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #5b7285; margin-bottom: 0.75em;">Hardened Configuration</div>
  <pre style="margin: 0; font-family: SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.95em; line-height: 1.6; color: #1f2933;"><code>uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2</code></pre>
</div>

<div style="margin: 1em 0 1.75em 0; padding: 0.9em 1.1em; border-left: 4px solid #1abc9c; background: #f4fcfa; border-radius: 8px;">
  <strong>Callout:</strong> if a version reference can move, an attacker can move it too.
</div>

### 2. Excessive `GITHUB_TOKEN` Permissions

Every time a workflow run starts, GitHub automatically spins up an ephemeral cryptographic credential known as the `GITHUB_TOKEN`. Unless restricted via explicit administrative defaults, this token historically inherits a highly permissive write-all state by default across multiple resource categories.

**The Attack**: If a single step inside your job gets compromised, for example, through a compromised third-party node module dependency or an untrusted script, the running container gains broad authority to alter your repository. An attacker leveraging a compromised runner can directly push backdoored code onto major branches, approve their own malicious pull requests, or wipe out historical runtime execution logs to conceal their tracks.

<div style="margin: 1em 0 1.5em 0; padding: 1em 1.15em; background: #f7fafc; border: 1px solid #d9e6ef; border-radius: 10px; overflow-x: auto;">
  <div style="font-size: 0.78em; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #5b7285; margin-bottom: 0.75em;">Abuse Example</div>
  <pre style="margin: 0; font-family: SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.95em; line-height: 1.6; color: #1f2933;"><code>gh api --method DELETE /repos/{owner}/{repo}/actions/runs/{run_id} # Log deletion</code></pre>
</div>

**The Mitigation**: Enforce a strict least-privilege structural footprint directly within your workflow files. Start by setting a baseline global configuration of `permissions: {}` (which denies all access parameters by default), and explicitly grant read or write capabilities uniquely to the specific jobs that require them:

<div style="margin: 1em 0 1.5em 0; padding: 1em 1.15em; background: #f7fafc; border: 1px solid #d9e6ef; border-radius: 10px; overflow-x: auto;">
  <div style="font-size: 0.78em; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #5b7285; margin-bottom: 0.75em;">Hardened Configuration</div>
  <pre style="margin: 0; font-family: SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.95em; line-height: 1.6; color: #1f2933;"><code>permissions: {} # Global default: deny all permissions

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read # Scoped down uniquely to repository code retrieval
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2</code></pre>
</div>

<div style="margin: 1em 0 1.75em 0; padding: 0.9em 1.1em; border-left: 4px solid #1abc9c; background: #f4fcfa; border-radius: 8px;">
  <strong>Default stance:</strong> assume any compromised step will abuse every permission you forgot to remove.
</div>

### 3. Contextual Injection via Dynamic Scripting

Workflows frequently evaluate real-time repository variables using expressions formatted as `{% raw %}${{ github.event.* }}{% endraw %}` to collect relevant execution variables, such as pull request titles, issue comments, or branch references.

**The Attack**: Problems appear when context-dependent strings are appended natively inside an unvalidated inline shell script execution block (`run:`).

<div style="margin: 1em 0 1.5em 0; padding: 1em 1.15em; background: #f7fafc; border: 1px solid #d9e6ef; border-radius: 10px; overflow-x: auto;">
  <div style="font-size: 0.78em; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #5b7285; margin-bottom: 0.75em;">Vulnerable Configuration</div>
  <div style="margin: 0; white-space: pre-wrap; font-family: SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.95em; line-height: 1.6; color: #1f2933;">- name: Log Branch Information
  run: echo "Processing branch: &#36;&#123;&#123; github.event.pull_request.head.ref &#125;&#125;"</div>
</div>

GitHub evaluates these expressions and substitutes the absolute values directly as raw characters before passing the script execution payload to the underlying command-line shell interface. If an external attacker creates a malicious pull request from a public fork using a branch name containing shell execution operators, such as `; rm -rf / ;` or a reverse shell hook, the runner interprets those command delimiters literally, introducing arbitrary remote code execution (RCE).

**The Mitigation**: Never concatenate dynamic user input strings directly into executable shell parameters. Instead, decouple structural execution code from user data variables by binding contexts securely into intermediate script environment variables (`env:`). The execution engine treats the bound parameters safely as strict, non-executable literal string parameters:

<div style="margin: 1em 0 1.5em 0; padding: 1em 1.15em; background: #f7fafc; border: 1px solid #d9e6ef; border-radius: 10px; overflow-x: auto;">
  <div style="font-size: 0.78em; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #5b7285; margin-bottom: 0.75em;">Hardened Configuration</div>
  <div style="margin: 0; white-space: pre-wrap; font-family: SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.95em; line-height: 1.6; color: #1f2933;">- name: Log Branch Information
  env:
    PR_REF: &#36;&#123;&#123; github.event.pull_request.head.ref &#125;&#125;
  run: echo "Processing branch: &#36;PR_REF"</div>
</div>

<div style="margin: 1em 0 1.75em 0; padding: 0.9em 1.1em; border-left: 4px solid #1abc9c; background: #f4fcfa; border-radius: 8px;">
  <strong>Rule of thumb:</strong> treat all workflow context derived from pull requests, issues, comments, and branch names as untrusted input.
</div>

### 4. Diagnostic Secret Leakage (`set -x`)

When a complex integration routine unexpectedly fails within an automated workflow environment, developers naturally shift toward traditional diagnostic troubleshooting tools. A routine reflex is introducing execution tracing markers to verify internal variables:

<div style="margin: 1em 0 1.5em 0; padding: 1em 1.15em; background: #f7fafc; border: 1px solid #d9e6ef; border-radius: 10px; overflow-x: auto;">
  <div style="font-size: 0.78em; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #5b7285; margin-bottom: 0.75em;">Vulnerable Debugging Attempt</div>
  <div style="margin: 0; white-space: pre-wrap; font-family: SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.95em; line-height: 1.6; color: #1f2933;">- name: Execute Embedded Build
  run: |
    set -x # Activating deep trace mode to isolate errors
    pio run --environment m5stick-c
  env:
    WIFI_PASSWORD: &#36;&#123;&#123; secrets.WIFI_PASS &#125;&#125;</div>
</div>

**The Attack**: Activating verbose runtime options such as `set -x` forces the shell interface to trace and display every processed line to standard output. Because GitHub substitutes workflow secrets into the execution context before passing the code block to the terminal instance, the explicit instruction prints out sensitive API tokens, cryptographic credentials, or passwords in explicit plain text right into the execution log history. This effectively circumvents the platform's automatic log masking engine, leaving your organization's infrastructure credentials visible to anyone with repository visibility.

**The Mitigation**: Avoid verbose tracing flags (`set -x`, `bash -v`) anywhere secret objects are being parsed. Ensure sensitive variables remain completely confined inside dedicated `env` scopes attached uniquely to individual job steps rather than spreading broad exposures across wide script contexts.

<div style="margin: 1em 0 1.75em 0; padding: 0.9em 1.1em; border-left: 4px solid #ff8a00; background: #fff8ef; border-radius: 8px;">
  <strong>Logging is part of your attack surface.</strong> A secret printed once is a secret exposed to every user who can read the run logs.
</div>

## Balancing the Defense: Static Analysis Vs. Active Pentesting

Securing complex pipelines manually across an entire organization can be a daunting and error-prone task. To scale pipeline defense effectively, security teams must combine automated discovery tools with proof-of-concept testing.

This balance can be achieved using two open-source tools: `zizmor` and `SmokedMeat`.

### Static Analysis with `zizmor`

`zizmor` is a lightning-fast, open-source static analysis tool designed specifically to audit GitHub Actions configurations. It parses your YAML files, checks them against known security antipatterns, and provides direct, actionable feedback:

<div style="margin: 1em 0 1.5em 0; padding: 1em 1.15em; background: #f7fafc; border: 1px solid #d9e6ef; border-radius: 10px; overflow-x: auto;">
  <div style="font-size: 0.78em; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #5b7285; margin-bottom: 0.75em;">Command</div>
  <pre style="margin: 0; font-family: SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.95em; line-height: 1.6; color: #1f2933;"><code>uvx zizmor .</code></pre>
</div>

When evaluated against a vulnerable pipeline, the engine instantly highlights structural flaws:

<div style="margin: 1em 0 1.5em 0; padding: 1em 1.15em; background: #f7fafc; border: 1px solid #d9e6ef; border-radius: 10px; overflow-x: auto;">
  <div style="font-size: 0.78em; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #5b7285; margin-bottom: 0.75em;">Example Findings</div>
  <pre style="margin: 0; font-family: SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.95em; line-height: 1.6; color: #1f2933;"><code>error[template-injection]: code injection via template expansion
  --> .github/workflows/firmware-build.yml:62 (pull_request.head.ref)

error[unpinned-uses]: unpinned action reference
  --> .github/workflows/firmware-build.yml:12 (checkout@v3)</code></pre>
</div>

Integrating `zizmor` as a static check into your pull request pipelines ensures that no insecure YAML configuration slips into your codebase.

### Active Verification with `SmokedMeat`

While static analysis is great at flagging potential issues, findings on a static dashboard can sometimes linger in a backlog. That is where active pentesting comes into play.

We also utilize SmokedMeat, an active CI/CD red-teaming framework. Unlike `zizmor`, which reads configuration files statically, `SmokedMeat` acts like an attacker: it generates a payload, deploys a staging exploit via an issue comment or pull request, compromises the running container, and actively harvests secrets directly from the runner's process memory.

Seeing an exploit dynamically pivot from a simple template injection flaw to extracting active cloud provider credentials via OIDC in under 60 seconds fundamentally changes how teams prioritize pipeline bugs. Static analysis finds the crack in the armor; active pentesting proves the blast radius.

<div style="margin: 1.25em 0 1.75em 0; padding: 0.95em 1.15em; border-left: 4px solid #0078b4; background: #f7fbfe; border-radius: 8px;">
  <strong>Static analysis finds likely weaknesses.</strong> Active testing proves operational impact. You need both.
</div>

## Key Takeaways for Hardening Your Pipelines

Building robust applications, especially when dealing with embedded systems or connected hardware firmware, requires strict ownership over the execution tools that package them. As you review your team's workflows this week, stick to these foundational supply chain hygiene practices:

1. **Lock Down Permissions**: Start every workflow file with a global `permissions: {}` zero-trust block.
2. **Commit to Hashes**: Stop using mutable version tags for marketplace actions; pin exclusively to 40-character commit SHAs.
3. **Isolate Dynamic Input**: Never pass dynamic context strings into raw shell execution paths. Always isolate them inside `env:` blocks.
4. **Clean up Debugging Artifacts**: Ensure verbose script flags like `set -x` are stripped out before pipelines are merged.
5. **Verify Continuously**: Use tools like `zizmor` for automatic linting, and understand the real-world impact of your vulnerabilities by studying pipeline attack chains.

## References

- <https://docs.zizmor.sh/>
- <https://github.com/boostsecurityio/smokedmeat>
