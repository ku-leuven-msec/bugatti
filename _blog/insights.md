---
layout: blog
title: "The False Positive Flood: Six Insights for CVE Triage in Embedded Systems"
author: J. Lapon
date: 2025-11-27
reading_time: "8 min read"
excerpt: "Understanding why vulnerability scanners produce overwhelming false positive alerts and how to effectively triage CVE results in embedded systems."
author_ico: "/assets/images/x098au987.jpg"
---


<img src="/bugatti/assets/images/se-tsuchiya-sPLLVFJXlb8-unsplash.jpg" alt="Embedded Security" style="width:100%; max-width:600px; display:block; margin: 2em auto 2em auto; border-radius: 10px; box-shadow: 0 2px 12px rgba(0,0,0,0.10);">




> "Effective vulnerability management in embedded systems requires more than just running a scanner, it demands context, expertise, and the right data."


Embedded systems today sit at the heart of modern infrastructure, consumer electronics, industrial environments, and critical operational technology. Yet their exposure to the internet makes them attractive targets for attackers. 



Recent real-world incidents illustrate this clearly. Botnet activity, such as AISURU [[3](#ref3)] shows how compromised embedded devices can be repurposed at massive scale for proxying and abuse, while ransomware groups like Akira [[4](#ref4)] have exploited poorly configured IoT devices to gain footholds inside networks and bypass endpoint detection systems. These cases underscore a simple fact: embedded vulnerability management is now an operational necessity rather than an optional best practice. And with upcoming regulatory frameworks such as the EU Cyber Resilience Act (CRA), vulnerability management is becoming a legal requirement for market access.

A critical component of vulnerability management is the Common Vulnerabilities and Exposures (CVE) system. CVEs identify publicly disclosed security vulnerabilities in software and libraries, allowing organizations to track and remediate known weaknesses across their supply chain. To meet regulatory expectations, organizations increasingly deploy automated vulnerability scanners to identify known CVEs in their embedded systems. 
However, these tools frequently overwhelm teams with large numbers of alerts that do not represent real security risk.

In the context of NIS2 and similar regulations, customers also perform their own scans and often expect vendors to remediate every reported CVE. Yet scanner results frequently fail to reflect the actual exploitability or operational relevance of vulnerabilities on embedded devices.

To help teams navigate these challenges, we have identified six recurring issues that strongly influence the accuracy and usefulness of vulnerability scanning results. These insights explain why the gap between scanner output and real security risk is often so wide, and provide guidance for triaging the flood of CVEs and quickly separating signal from noise.

### 1. Incorrect Entries in CVE Databases
CVE databases such as NVD, MITRE, and EUVD often contain incomplete or inconsistent metadata, particularly in their descriptions of which products or versions are affected. While entries are shared between databases, the level of detail and accuracy can vary substantially between sources for the same CVE. Because scanners rely heavily on this information, these inconsistencies easily propagate into false positives in automated reports.

Corrections to CVE records can take weeks or even months to appear, meaning inaccurate entries may continue to distort assessments long after the mistakes are known.
Modern scanning tools attempt to mitigate this by pulling data from multiple vulnerability feeds and vendor advisories, but discrepancies across sources remain common and still result in mismatched or overly broad vulnerability matches.

### 2. Incorrect Identification of Software Packages

Accurate vulnerability detection depends on correctly identifying which software packages and versions are present on a device. Tools typically rely on either:
- manifest files or SBOMs for *exact* identification, or
- heuristic techniques such as binary fingerprinting and banner-grabbing for a *best guess*.

Although SBOMs and manifests are generally more reliable, *exact* identification is only as complete as the metadata they contain. Many SBOMs omit crucial details such as the vendor or origin of a package. Without this information, scanners may still draw incorrect conclusions about which vulnerabilities apply.

Heuristic identification is even more prone to error. Tools such as OpenVAS and Nessus, which are designed for network-based discovery, rely heavily on service probing and banner-grabbing to infer package versions. This can lead to misinterpretation of libraries, confusion between similar components, or incorrect version guesses, especially when binaries are stripped, statically linked, or produced by different build chains. Even small mismatches can result in irrelevant or misleading vulnerability matches.

Even when a package is correctly identified, scanners may still draw incorrect conclusions because vulnerability databases rely on CPE entries that cannot express important nuances. For example, some vulnerabilities apply only to certain language implementations of a library (such as the C++ version of Protobuf but not its Python or Java variants), or only to specific build configurations. Because CPE data describes software at a coarse level, it cannot capture these distinctions, leading scanners to flag CVEs that do not apply to the actual component present in the device.

Customers using network-based scanners often encounter false positives because services advertise generic banners or reused version strings, causing scanners to assume the presence of packages or versions that are not actually running on the device.

### 3. Unexploitable Vulnerabilities
A vulnerability is only relevant if the affected code is actually present and reachable. Many Linux-kernel-related CVEs apply only when specific optional drivers or subsystems (e.g., a UVC video driver or networking module) are enabled and loaded. Embedded kernels are configured with only a subset of features enabled, meaning many upstream components are disabled or absent from the final image.

Similar situations occur in user-space software. Many libraries and tools include optional functionality that may be disabled at build time or never exercised by the application. Scanners may still flag vulnerabilities in these unused or non-included components because they assume the full upstream feature set is present.

SBOMs and CVE reports generated by build systems often include build-time utilities, toolchain components, and native libraries that exist only in the build environment and are not shipped on the device. Because scanners do not distinguish between build-time and runtime components, these entries frequently lead to false positives for issues that cannot affect the deployed system.

Without this configuration and usage context, scanners routinely report vulnerabilities that cannot be triggered on the actual device, resulting in a significant number of false positives.

### 4. Backporting: Patched or Not?
Commercial Linux distributions and embedded build systems routinely backport security fixes from newer upstream releases into older maintained versions. Major distributions such as Ubuntu, Debian, SUSE, and Red Hat document these backports in their security advisories, and CVE databases may include corresponding entries for some of these products. However, public CVE databases do not reliably represent backported patches.

*Custom embedded images receive no such automatic coverage*. Databases like NVD, MITRE, or EUVD have no visibility into patches applied in Yocto, Buildroot, or vendor BSP layers. As a result, embedded systems often appear vulnerable simply because their version string matches a vulnerable upstream release, even when the fix has already been applied during the build.

In practice, this means a device may already contain the necessary patch, yet scanners continue to flag the CVE. Without examining build metadata, applied patch files, or board support layers, teams risk spending time “fixing” vulnerabilities that are already resolved.

### 5. The Build System Is the Source of Truth
Embedded build systems like Yocto and Buildroot contain detailed metadata about package versions, applied patches, configuration options, and dependency relationships. They also provide mechanisms to record ignored or not-applicable CVEs, track backported fixes, distinguish between build-time and runtime dependencies, and specify per-package exceptions. For example, Yocto exposes fields such as ```CVE_STATUS``` and ```CVE_CHECK_IGNORE```, while Buildroot offers per-package options like ```*_IGNORE_CVES``` to mark vulnerabilities as not applicable or already fixed. This information reflects the actual software composition of the device and therefore provides the most accurate foundation for vulnerability triage.

Because scanners and vulnerability databases cannot infer this context, vendors should use this metadata to communicate their security posture effectively. One practical approach is to generate VEX (Vulnerability Exploitability Exchange) documents [[2](#ref2)]. These machine-readable files allow vendors to explicitly mark CVEs as *Not Affected* or *Fixed* based on configuration choices, removed features, or backported patches. When supported by customer tooling, VEX files enable scanners to automatically suppress false alarms and reduce unnecessary workload.

### 6. SBOMs: Helpful, but Not Magic
Modern vulnerability scanners increasingly rely on Software Bills of Materials (SBOMs) as their ground truth for identifying the components present in a product. SBOMs promise transparency by listing included components, but they capture only what the generating tool detects or infers. Research by Benedetti et al. [[1](#ref1)] revealed substantial discrepancies in SBOM generation, particularly in the Python ecosystem, up to 75% of the identified components are not actually installed. Such inconsistent or incorrect component lists naturally propagate into downstream vulnerability assessments. SBOMs are valuable, but they must be interpreted in context and validated against the build system.

In principle, an SBOM should provide accurate component identification, including the component name, supplier, and version, to support reliable vulnerability matching. In practice, however, SBOMs often lack consistent identifiers, rely on generic naming, or omit details necessary to distinguish between similar packages. These identification gaps can lead scanners to associate the wrong vulnerabilities with the wrong components, even when the SBOM appears complete.





## From Overload to Action
> **Key Takeaways for CVE Triage:**
>
> - Include build system metadata to avoid false positives.
> - Validate CVE database entries and use multiple sources for accuracy.
> - Prefer SBOMs and manifests for software identification, but always verify their completeness.
> - Determine if flagged vulnerabilities are actually exploitable in your device’s configuration.
> - Check if security patches have been backported, even if version strings suggest otherwise.

Vulnerability scanners and public databases are essential tools, but they operate with incomplete context. They cannot know which features are enabled, which components are actually shipped, which patches have been backported, or whether the affected code is reachable on the device. As a result, their output often reflects potential vulnerabilities rather than actual security risk. SBOMs improve transparency, but only when they accurately describe the software that is truly present, and even then, identification alone cannot express exploitability or configuration-specific nuances.


Effective vulnerability management in embedded systems requires combining automated results with the authoritative knowledge contained in build metadata, configuration files, and developer insight. Build systems such as Yocto and Buildroot provide this ground truth, distinguishing build-time from runtime components, tracking applied patches, and capturing configuration decisions that scanners cannot infer. When this information must be communicated externally, VEX documents provide a structured way to express whether a CVE is relevant, mitigated, or not applicable.  While VEX is not yet explicitly required by most regulatory frameworks, it is rapidly emerging as best practice for providing clear, machine-readable vulnerability status and greatly reduces unnecessary triage effort.

By understanding these six sources of false positives, and by grounding vulnerability assessments in build-system metadata and contextual information, organizations can move from a CVE overload to a more reliable, targeted, and actionable security process.


## References

<ol>
<li id="ref1">Krebs, on Security (October, 2025). <em><a href="https://krebsonsecurity.com/2025/10/aisuru-botnet-shifts-from-ddos-to-residential-proxies/">Aisuru Botnet Shifts from DDoS to Residential Proxies</a></em>. Krebs on Security.</li>
<li id="ref2">Open Source Security Foundation. (September, 2023). <em><a href="https://openssf.org/blog/2023/09/07/vdr-vex-openvex-and-csaf/">VDR, VEX, OpenVEX and CSAF</a></em>.</li>
<li id="ref3">Cybersecurity and Infrastructure Security Agency (CISA). (April, 2023). <em><a href="https://www.cisa.gov/sites/default/files/2023-04/minimum-requirements-for-vex-508c.pdf">Minimum requirements for Vulnerability Exploitability eXchange (VEX)</a></em>.</li>
<li id="ref4">Benedetti, G., Cofano, S., Brighente, A., & Conti, M. (2024). <em><a href="https://arxiv.org/abs/2409.06390">The impact of SBOM generators on vulnerability assessment in Python: A comparison and a novel approach</a></em>.</li>
</ol>

## About the Author
dr. ing. J. Lapon is a cybersecurity research manager at KU Leuven’s DistriNet Research Group, Campus Ghent. His work centers on embedded and IoT security, vulnerability management, and practical methods for secure software development in industrial environments.
