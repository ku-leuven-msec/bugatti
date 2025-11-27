---
layout: event
title: "Securing the Embedded World: Effective Testing"
date: 2025-11-13
event_type: "User Group Meeting + Public Workshop"
---

# Securing the Embedded World: Effective Testing

**Date:** November 13, 2025  
**Type:** User Group Meeting + Public Workshop  
**Location:** TBD

## Overview

This hands-on workshop explored practical approaches to embedded security testing with three focused presentations:

1. **CVE Discovery and Management** - Strategies for finding, filtering, and managing known vulnerabilities and CVEs in embedded systems, addressing the challenge of vulnerability overload and prioritization
2. **WebRTC and RTC Security in IoT** - A deep investigation into Real-Time Communication implementations in consumer IoT devices, uncovering architectural vulnerabilities and security gaps in peer-to-peer communication protocols
3. **Automated Resilience Testing** - Introduction to Onweer, a fuzzing framework that automates security testing through intelligent input generation and test oracle design

Participants gained practical insights into vulnerability management, understanding modern communication protocol security risks, and implementing automated testing techniques for production deployments.

## Presentations

{% include presentation-card.html 
   href="/bugatti/assets/events/2025_11_13 UG+workshop/1. Intro + Strengths and pitfalls of Embedded Security Testing Tools.pdf" 
   title="CVE Discovery & Management" 
   speaker="J. Lapon"
%}
{% include presentation-card.html 
   href="/bugatti/assets/events/2025_11_13 UG+workshop/2. Investigating RTC Security in Consumer IoT.pdf" 
   title="RTC Security in Consumer IoT" 
   speaker="V. Goeman"
%}
{% include presentation-card.html 
   href="/bugatti/assets/events/2025_11_13 UG+workshop/3. Onweer- Automated Resilience Testing through Fuzzing.pdf" 
   title="Onweer - Automated Resilience Testing" 
   speaker="G. Coremans"
%}

## Key Takeaways

- **CVE Management Challenge**: Organizations face overwhelming numbers of known vulnerabilities. Effective strategies for finding, filtering, and prioritizing CVEs are essential to focus security efforts on the most critical risks for embedded systems.

TODO: Add ref to blog!

- **Real-Time Communication Risks**: WebRTC and peer-to-peer RTC implementations in IoT devices often overlook security best practices. Understanding the architecture of RTC sessions, including NAT traversal, connectivity management, and cryptographic handshakes, is essential for identifying vulnerabilities before deployment.

- **Automated Resilience Testing**: Fuzzing as implemented in tools like Onweer complements traditional test suites by discovering edge cases that manual testing misses. Grammar-based fuzzing and proper test oracles enable efficient automated security testing at scale.

- **Integrated Security Approach**: Combining vulnerability tracking and management with automated testing provides comprehensive security coverage for embedded IoT systems from known issues through emerging attack vectors
