---
layout: blog
title: "Onweer: Leveraging Fuzzing for Automated Chaos In Testing"
author: G. Coremans (VUB-Soft)
date: 2026-04-20
reading_time: "9 min read"
excerpt: "Onweer combines REST API fuzzing with fault injection to automatically discover resilience bugs that conventional testing misses."
author_ico: "/assets/images/photosmall.jpg.webp"
---


<div style="width:100%; max-width:600px; margin:2em auto;">
  <img src="/assets/images/oxana-golubets-lXHx-zumrJs-unsplash.jpg" alt="Fuzzing for Automated Chaos Testing" style="width:100%; display:block; margin:0; border-radius:10px; box-shadow:0 2px 12px rgba(0,0,0,0.10);">
  <p style="margin:0.35em 0 0 0; text-align:right; font-size:0.9em;">Photo by <a href="https://unsplash.com/@ok_milka?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Oxana Golubets</a> on <a href="https://unsplash.com/photos/abstract-waves-resemble-mountain-ridges-in-blue-lXHx-zumrJs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>
</div>


Today, microservices are common across the tech industry as an architecture for large web applications.
Splitting up large applications into many smaller microservices offers many advantages.
Services can be developed independently from each other, allowing different teams to work in parallel more easily.
Scaling can also happen on a per-service basis, enabling applications to flexibly scale to high loads without over-committing resources.
> "If your tests never break the network, they will never validate your recovery logic."


However, this approach also introduces new complexities as services need to communicate with each other, and those communication channels can be unreliable.
Connection errors may occur or messages may be lost, and the application must be designed to handle these edge cases.
This fault handling logic can be challenging to write correctly, as it requires keeping track of many possible errors or combinations of errors that could occur at any time during program execution.

To make matters worse, fault handling code is very difficult to test, as errors are often rare.
In a local testing environment, where there is little scaling and only a very local, reliable network, errors may never occur at all.
Thus, the code which ensures your application keeps going when a network cable is cut or a datacenter goes down is often not covered or tested at all.


## Chaos Engineering

To ensure their services remain reliable even in the face of network errors or outages, Netflix developed the discipline of **Chaos Engineering** [1].
In Chaos Engineering, realistic faults are randomly injected into a production system in order to test its resilience to those faults.
For example, a service may be killed, connections may be reset, or even a whole datacenter may be taken briefly offline.
Various metrics are used to measure the impact of those faults on the system.
These can be technical metrics, such as request throughput, but also business metrics, such as the number of users actively watching streams or signing up to the service.
If a chaos experiment causes these to drop precipitously, the system is not sufficiently resilient to faults, which must be remedied.

While Chaos Engineering has enjoyed great success and has been adopted by many large technology companies, it is far from universally applicable.
Running and monitoring a chaos experiment is a specialized and labor-intensive task which often requires a dedicated team of Site Reliability Engineers (SREs), which not every company may have.
Furthermore, not everyone can afford to run experiments in production.
A medical company may not be able to afford any disruptions to its services at all, as this could impact services which may be critical to save lives.


## Resilience Testing

To make chaos engineering easier to use for more companies, it is necessary to test automatically so that less specialized labor is required, and to perform testing in staging environments so that the production system is not disrupted.
This field of research is known as **Resilience Testing**, and has produced several tools such as Chaokka [2] and Filibuster [3] which will randomly inject faults into the program during execution of tests.
> "Resilience is not proven when everything works, it is proven when controlled failures occur."


However, the current state of the art of resilience testing still has limitations.
Most notably, existing tools will inject a wide variety of faults to find fault handling bugs, but they still require developers to write the tests under which faults will be injected.
Thus, it is possible for bugs to be missed because the developers did not provide the resilience testing tool with a test which could trigger that bug.


## Onweer

To solve this problem, **Onweer** was developed at the Software Languages Lab of the Vrije Universiteit Brussel.
This resilience testing tool uses fuzz testing techniques to simultaneously explore all possible inputs and faults in a microservice system.

Onweer functions as a REST API fuzzer.
Using an OpenAPI or Swagger specification of the application&rsquo;s REST API, it generates random request sequences to test the application.
To make this fuzzing process efficient, the coverage achieved by every generated sequence is measured.
If a sequence results in increased code coverage, that means it executes code that was not yet reached by any other sequence, and it is thus &ldquo;interesting&rdquo;.
All of these interesting sequences are collected in the &ldquo;population&rdquo;, and new sequences are created by taking a random sequence from the population and mutating it.
Mutating a sequence means changing some part of it, for example changing a request parameter, adding a new request to the sequence, swapping the order of two requests in the sequence, ...
This is the basic fuzzing loop which has proven effective in software testing [4].

Onweer innovates the REST API fuzzer by tightly integrating fault injection into the fuzzing loop.
In addition to code coverage, Onweer collects a list of every internal REST request between services.
These internal REST requests are points where fault injection can be performed, for example by causing the request to fail.
This list of potential fault injection points is stored alongside the sequence in the population.

Then, when a new sequence is generated, one of the possible mutations which can be performed is to inject a fault in one of the potential fault injection points.
When a request with an injected fault is executed, an exception corresponding to a connection error is thrown when the affected call is executed.
This can increase code coverage by executing exception handlers which are impossible to trigger without connection errors.

If an injected fault does increase code coverage, that sequence is determined to be interesting and added to the population for further mutation.
This enables that sequence with injected faults to be further mutated, changing its inputs or injecting further faults to explore more exception handlers or potentially find a crash.
In this way, Onweer completely integrates fault injection into the fuzzing process, combining the bug-finding power of fuzzing with the ability of fault injection to model real-world conditions.

We evaluated Onweer on benchmark systems to verify that it can find bugs which cannot be found without fault injection.
On the TeaStore benchmark system [5], we observed that enabling fault injection in Onweer consistently improved code coverage.
In addition, Onweer with fault injection was able to find 16 crashes which are impossible to reproduce without fault injection.

This shows that these systems harbor bugs which require fault injection testing to uncover, as the network conditions necessary to trigger these bugs will not occur in regular testing, even though they may very well occur in production.
With Onweer, we present an approach that allows fault injection testing to be done fully in a testing environment, eliminating impact on end-users.
Onweer can also function fully automatically, reducing the work required from developers and ensuring that no bugs are missed because of incomplete test cases.

## Sources

[1] [A. Basiri et al., Chaos Engineering, in IEEE Software, vol. 33, no. 3, pp. 35-41, May-June 2016](https://ieeexplore.ieee.org/abstract/document/7436642)

[2] [J. De Bleser et al., 2020. A Delta-Debugging Approach to Assessing the Resilience of Actor Programs through Run-time Test Perturbations. In Proceedings of the IEEE/ACM 1st International Conference on Automation of Software Test (AST &rsquo;20). Association for Computing Machinery, New York, NY, USA, 21–30](https://dl.acm.org/doi/10.1145/3387903.3389303)

[3] [C. S. Meiklejohn, et al., 2021. Service-Level Fault Injection Testing. In Proceedings of the ACM Symposium on Cloud Computing (SoCC &rsquo;21). Association for Computing Machinery, New York, NY, USA, 388–402](https://dl.acm.org/doi/10.1145/3472883.3487005)

[4] [A. Zeller et al., The Fuzzing Book](https://www.fuzzingbook.org)

[5] [J. von Kistowski et al., TeaStore](https://github.com/DescartesResearch/TeaStore)
