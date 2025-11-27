import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Cpu, Shield, Code, Video, FileText, Users, AlertTriangle, FileDown } from 'lucide-react';

const MeltdownReport = () => {
  const [expandedSection, setExpandedSection] = useState('abstract');
  const [activeTab, setActiveTab] = useState('report');

  const sections = [
    { id: 'abstract', title: 'Abstract', icon: FileText },
    { id: 'introduction', title: 'Introduction', icon: AlertTriangle },
    { id: 'background', title: 'Technical Background', icon: Cpu },
    { id: 'attack', title: 'Attack Mechanism', icon: Code },
    { id: 'implementation', title: 'Implementation Analysis', icon: Code },
    { id: 'mitigations', title: 'Mitigations', icon: Shield },
    { id: 'conclusion', title: 'Conclusion', icon: FileText },
    { id: 'references', title: 'References', icon: FileText }
  ];

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const SectionContent = ({ id }) => {
    const content = {
      abstract: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Meltdown (CVE-2017-5754) represents a critical microarchitectural vulnerability affecting modern processors 
            that breaks the fundamental security boundary between user applications and operating system kernel memory. 
            This vulnerability exploits out-of-order execution and speculative execution mechanisms in modern CPUs to 
            allow unprivileged processes to read arbitrary kernel memory, including sensitive data such as passwords, 
            cryptographic keys, and cached information from other processes.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This report provides a comprehensive technical analysis of the Meltdown vulnerability, examining the 
            underlying CPU microarchitectural features that enable the attack, demonstrating a practical proof-of-concept 
            implementation, and reviewing industry-standard mitigation strategies. Our controlled simulation successfully 
            demonstrates the capability to leak protected kernel memory through cache-based timing side channels, 
            validating the severity of this vulnerability class.
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-4">
            <p className="text-sm text-amber-800">
              <strong>Keywords:</strong> Meltdown, Speculative Execution, Side-Channel Attack, Cache Timing, 
              Kernel Memory Isolation, CVE-2017-5754, Flush+Reload
            </p>
          </div>
        </div>
      ),
      introduction: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">1.1 Historical Context</h3>
          <p className="text-gray-700 leading-relaxed">
            In January 2018, security researchers publicly disclosed a critical vulnerability affecting nearly every 
            modern processor manufactured in the past two decades. Named "Meltdown" by the research team at Graz 
            University of Technology, this vulnerability fundamentally challenged assumptions about hardware-based 
            security guarantees that operating systems rely upon for memory isolation.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">1.2 Threat Model</h3>
          <p className="text-gray-700 leading-relaxed">
            The Meltdown attack operates under the following assumptions:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>The attacker has the ability to execute arbitrary code on the target system (unprivileged user access)</li>
            <li>The target system uses a vulnerable processor (primarily Intel CPUs manufactured before 2018)</li>
            <li>The attacker can measure precise timing information for memory accesses</li>
            <li>The target data resides in physical memory accessible by the CPU</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">1.3 Impact Assessment</h3>
          <p className="text-gray-700 leading-relaxed">
            Meltdown enables several critical attack scenarios including disclosure of kernel memory contents, 
            extraction of cryptographic keys from secure kernel operations, reading passwords and sensitive data from 
            other processes, and bypassing kernel address space layout randomization defenses. The vulnerability 
            affects cloud computing environments particularly severely, as malicious tenants could potentially read 
            memory from other virtual machines on shared hardware.
          </p>
        </div>
      ),
      background: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 CPU Microarchitecture Fundamentals</h3>
          
          <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Out-of-Order Execution</h4>
          <p className="text-gray-700 leading-relaxed">
            Modern CPUs employ out-of-order execution to maximize instruction throughput and utilize execution units 
            efficiently. Instructions are dynamically scheduled based on operand availability rather than program order. 
            This architectural feature allows the processor to continue executing subsequent independent instructions 
            while waiting for slow operations like memory fetches to complete.
          </p>
          
          <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Speculative Execution</h4>
          <p className="text-gray-700 leading-relaxed">
            Speculative execution extends out-of-order execution by allowing the CPU to guess which path a branch 
            instruction will take and begin executing instructions along that path before the branch condition is 
            resolved. If the speculation is correct, significant performance gains are achieved. If incorrect, the 
            CPU discards the speculative results and restores architectural state.
          </p>
          
          <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Memory Hierarchy and Caching</h4>
          <p className="text-gray-700 leading-relaxed">
            Modern processors implement multiple levels of cache memory (L1, L2, L3) to bridge the speed gap between 
            CPU and main memory. Cache access times are significantly faster (typically 4-12 cycles for L1) compared 
            to main memory access (50-200 cycles). This timing difference forms the basis for cache-based side-channel 
            attacks.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.2 Virtual Memory and Privilege Separation</h3>
          <p className="text-gray-700 leading-relaxed">
            Operating systems implement virtual memory to provide process isolation and protect kernel memory from 
            user-space access. Each process operates in its own virtual address space, with the kernel mapped into 
            the upper portion of this space. Hardware-enforced page table permissions prevent user-mode code from 
            accessing kernel pages. Attempting such access triggers a page fault exception.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.3 The Transient Execution Window</h3>
          <p className="text-gray-700 leading-relaxed">
            The critical insight behind Meltdown is that during speculative and out-of-order execution, the CPU 
            performs operations that are later discarded when an exception occurs. However, these transient instructions 
            can leave observable microarchitectural side effects in the cache state. This brief execution window 
            between instruction execution and exception handling provides the opportunity to encode secret data into 
            the cache timing channel.
          </p>
        </div>
      ),
      attack: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Attack Overview</h3>
          <p className="text-gray-700 leading-relaxed">
            The Meltdown attack consists of three fundamental phases: first, the attacker triggers a transient 
            instruction sequence that accesses protected kernel memory; second, the secret value retrieved is encoded 
            into the cache state through an array access; third, the attacker uses a timing side channel to decode 
            which array element was cached, revealing the secret byte value.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.2 Step-by-Step Attack Mechanism</h3>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-4">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Step 1: Preparation Phase</h4>
            <p className="text-gray-700 leading-relaxed mb-2">
              The attacker allocates a probe array of 256 entries, each separated by a page boundary to ensure 
              distinct cache lines. This array serves as the covert channel for transmitting leaked information. 
              All array elements are flushed from the cache using the CLFLUSH instruction.
            </p>
            <code className="block bg-gray-800 text-green-400 p-3 rounded text-sm mt-2">
              unsigned char array[256 * PAGE_SIZE];<br/>
              for (int i = 0; i &lt; 256; i++)<br/>
              &nbsp;&nbsp;_mm_clflush(&array[i * PAGE_SIZE]);
            </code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-4">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Step 2: Transient Execution</h4>
            <p className="text-gray-700 leading-relaxed mb-2">
              The attacker executes an instruction that dereferences a kernel memory address. Although this access 
              violates privilege permissions and will eventually raise an exception, the CPU speculatively executes 
              the load operation and subsequent dependent instructions before the permission check completes.
            </p>
            <code className="block bg-gray-800 text-green-400 p-3 rounded text-sm mt-2">
              char leaked = *(char*)kernel_address;<br/>
              array[leaked * PAGE_SIZE] = 1;
            </code>
            <p className="text-gray-700 leading-relaxed mt-2">
              The secret byte value is used to index into the probe array. This access brings the corresponding 
              cache line into the CPU cache before the exception handler rolls back architectural state.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-4">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Step 3: Cache Timing Side Channel (Flush+Reload)</h4>
            <p className="text-gray-700 leading-relaxed mb-2">
              The attacker measures access time for each element of the probe array. The element corresponding to 
              the leaked byte will have significantly faster access time because it resides in cache, while other 
              elements require slow memory access.
            </p>
            <code className="block bg-gray-800 text-green-400 p-3 rounded text-sm mt-2">
              for (int i = 0; i &lt; 256; i++) &#123;<br/>
              &nbsp;&nbsp;uint64_t start = __rdtscp(&temp);<br/>
              &nbsp;&nbsp;temp = array[i * PAGE_SIZE];<br/>
              &nbsp;&nbsp;uint64_t time = __rdtscp(&temp) - start;<br/>
              &nbsp;&nbsp;if (time &lt; THRESHOLD) leaked_value = i;<br/>
              &#125;
            </code>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.3 Why the Attack Succeeds</h3>
          <p className="text-gray-700 leading-relaxed">
            The vulnerability exists because CPU permission checks occur late in the pipeline, after speculative 
            execution has already begun. The CPU prioritizes performance by assuming memory accesses will succeed 
            and only verifies permissions when committing results. During the speculative execution window, the 
            processor has already loaded the secret value and modified cache state based on that value, creating 
            an observable side channel that persists even after the exception occurs.
          </p>
        </div>
      ),
      implementation: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Proof of Concept Architecture</h3>
          <p className="text-gray-700 leading-relaxed">
            Our implementation demonstrates the Meltdown vulnerability through a controlled simulation consisting of 
            two components: a victim process that maintains secret data in memory, and an attacker process that 
            leverages the vulnerability to read this protected information.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.2 Victim Process Implementation</h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <code className="block bg-gray-800 text-green-400 p-4 rounded text-sm font-mono whitespace-pre">
{`char secret_password[] = "MyP@ssw0rd123!";
char secret_key[] = "AES-256-KEY: 0x4f7d8e9a2b3c1d5e";

printf("Secret address: %p\\n", (void*)secret_password);

while(1) {
    sleep(1);
    volatile char temp = secret_password[0];
}`}
            </code>
          </div>
          <p className="text-gray-700 leading-relaxed mt-3">
            The victim process holds sensitive credentials in character arrays and continuously accesses them to 
            ensure they remain in CPU cache. The memory address is printed for demonstration purposes, simulating 
            a scenario where an attacker has discovered or predicted the location of sensitive kernel data.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.3 Critical Code Analysis: Timing Measurement</h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <code className="block bg-gray-800 text-green-400 p-4 rounded text-sm font-mono whitespace-pre">
{`uint64_t measure_access_time(void *addr) {
    uint64_t start, end;
    volatile char temp;
    
    start = __rdtscp((unsigned int*)&temp);  // Serializing timestamp
    temp = *(volatile char*)addr;             // Memory access
    end = __rdtscp((unsigned int*)&temp);     // Serializing timestamp
    
    return end - start;
}`}
            </code>
          </div>
          <p className="text-gray-700 leading-relaxed mt-3">
            <strong>Line-by-line analysis:</strong> The RDTSCP instruction reads the CPU timestamp counter with 
            serialization guarantees, ensuring accurate timing measurement. The volatile qualifier prevents compiler 
            optimization from eliminating the memory access. The time delta reveals whether data was served from 
            cache (fast, typically 4-12 cycles) or main memory (slow, 50-200 cycles).
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.4 Critical Code Analysis: Speculative Load</h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <code className="block bg-gray-800 text-green-400 p-4 rounded text-sm font-mono whitespace-pre">
{`char leak_byte(size_t kernel_addr) {
    flush_array();  // Clear all cache lines
    
    // CRITICAL: This access violates privilege boundaries
    // but executes speculatively before exception occurs
    leaked = *(volatile char*)kernel_addr;
    
    // Encode leaked value in cache state
    array[leaked * PAGE_SIZE] = 1;
    
    // Exception occurs here, architectural state rolls back
    // but cache side effects remain observable
}`}
            </code>
          </div>
          <p className="text-gray-700 leading-relaxed mt-3">
            <strong>Core vulnerability exploitation:</strong> The memory dereference at kernel_addr violates page 
            permissions and will trigger an exception. However, before the exception is raised, the CPU speculatively 
            executes the load and the subsequent array indexing operation. The array access creates a timing side 
            channel by caching the element at position corresponding to the leaked byte value. This microarchitectural 
            state persists despite architectural rollback.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.5 Noise Reduction and Statistical Approach</h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <code className="block bg-gray-800 text-green-400 p-4 rounded text-sm font-mono whitespace-pre">
{`int scores[256] = {0};

for (int run = 0; run < 1000; run++) {
    for (int i = 0; i < 256; i++) {
        int mix_i = ((i * 167) + 13) & 255;  // Prevent stride prediction
        uint64_t time = measure_access_time(&array[mix_i * PAGE_SIZE]);
        if (time < CACHE_HIT_THRESHOLD)
            scores[mix_i]++;
    }
}

// Select byte value with highest cache hit count
int max_score = 0;
char result = 0;
for (int i = 0; i < 256; i++) {
    if (scores[i] > max_score) {
        max_score = scores[i];
        result = i;
    }
}`}
            </code>
          </div>
          <p className="text-gray-700 leading-relaxed mt-3">
            The attack repeats measurements multiple times and maintains a scoring system to filter noise from timing 
            measurements. The non-sequential access pattern prevents CPU prefetcher interference. The byte value with 
            the highest number of cache hits across iterations represents the leaked secret with high confidence.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.6 Exception Handling Considerations</h3>
          <p className="text-gray-700 leading-relaxed">
            The speculative access to protected memory will raise a segmentation fault in user-space implementations. 
            In our demonstration, we utilize signal handlers or exception suppression techniques to prevent process 
            termination. Kernel-level variants of Meltdown exploit similar principles but operate entirely within 
            kernel context, avoiding user-visible exceptions.
          </p>
        </div>
      ),
      mitigations: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 KPTI: Kernel Page Table Isolation</h3>
          <p className="text-gray-700 leading-relaxed">
            The primary software mitigation deployed across operating systems is Kernel Page Table Isolation, originally 
            developed as KAISER for protecting against side-channel attacks on kernel address mappings. KPTI maintains 
            two separate page tables: one for user space containing only minimal kernel mappings required for system 
            call entry, and one for kernel space with full kernel memory mapped.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            When executing in user mode, the CPU uses the user page table which does not map sensitive kernel data. 
            This prevents the speculative execution window from accessing kernel memory because the page table entries 
            simply do not exist in the active page table. KPTI effectively eliminates the Meltdown attack vector at 
            the cost of increased overhead during system calls due to TLB flushing.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
            <p className="text-sm text-blue-800">
              <strong>Performance Impact:</strong> KPTI introduces measurable performance degradation, particularly 
              for workloads with frequent system calls. Benchmarks show 5-30% slowdown depending on application 
              characteristics, with the highest impact on I/O intensive workloads.
            </p>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">5.2 Hardware-Level Mitigations</h3>
          <p className="text-gray-700 leading-relaxed">
            Intel and AMD have implemented hardware fixes in newer processor generations. These include enhanced 
            privilege checks that occur earlier in the pipeline, preventing speculative loads from accessing 
            higher-privileged memory. Processors released after 2018 incorporate these protections at the 
            microarchitectural level.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">5.3 Compiler and Software Hardening</h3>
          <p className="text-gray-700 leading-relaxed">
            Additional software techniques include selective use of speculation barriers (LFENCE instructions) in 
            security-critical code paths, compiler-level mitigations to prevent generation of vulnerable code patterns, 
            and careful placement of sensitive data in memory regions less likely to be speculatively accessed. 
            However, these approaches provide incomplete protection and are generally supplementary to KPTI.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">5.4 Defense Recommendations</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Enable KPTI on all systems running vulnerable processors (automatic in modern OS versions)</li>
            <li>Apply vendor security updates and microcode patches promptly</li>
            <li>For cloud environments, ensure hypervisor-level protections are enabled</li>
            <li>Consider hardware replacement for high-security environments requiring zero-overhead protection</li>
            <li>Implement defense-in-depth strategies rather than relying on single mitigation techniques</li>
          </ul>
        </div>
      ),
      conclusion: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            The Meltdown vulnerability represents a fundamental breakdown of security assumptions underlying modern 
            operating system design. Our analysis and practical demonstration confirm that speculative execution, 
            when combined with microarchitectural side channels, enables privileged memory disclosure across security 
            boundaries that were previously considered inviolable.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Key Findings</h3>
          <p className="text-gray-700 leading-relaxed">
            First, hardware performance optimization features such as speculative execution create subtle security 
            vulnerabilities that are difficult to detect through traditional security analysis. Second, 
            microarchitectural state provides covert channels that persist beyond architectural rollback mechanisms. 
            Third, effective mitigation requires coordinated efforts across hardware manufacturers, operating system 
            vendors, and application developers.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Broader Implications</h3>
          <p className="text-gray-700 leading-relaxed">
            Meltdown is one member of a larger class of transient execution vulnerabilities that challenge the 
            security foundations of modern computing. The discovery has prompted significant research into hardware 
            security verification, formal methods for proving security properties of CPU designs, and alternative 
            architectural approaches that provide security guarantees without sacrificing performance.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Future Research Directions</h3>
          <p className="text-gray-700 leading-relaxed">
            Ongoing research continues to discover variants and related vulnerabilities exploiting different aspects 
            of CPU microarchitecture. The security community must develop new analysis techniques for identifying 
            these issues during hardware design phases, establish security-first processor architectures, and create 
            formal verification methodologies that can prove the absence of such vulnerabilities.
          </p>
          
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-6">
            <p className="text-sm text-green-800">
              <strong>Ethical Considerations:</strong> This demonstration was conducted in a controlled, isolated 
              laboratory environment using deliberately vulnerable systems. The techniques described should only be 
              used for legitimate security research, system hardening, and educational purposes. Unauthorized access 
              to computer systems is illegal and unethical.
            </p>
          </div>
        </div>
      ),
      references: (
        <div className="space-y-3">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="text-gray-700 text-sm">
              [1] Lipp, M., Schwarz, M., Gruss, D., Prescher, T., Haas, W., Fogh, A., Horn, J., Mangard, S., 
              Kocher, P., Genkin, D., Yarom, Y., & Hamburg, M. (2018). <em>Meltdown: Reading Kernel Memory from 
              User Space</em>. In 27th USENIX Security Symposium (USENIX Security 18), pp. 973-990.
            </p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="text-gray-700 text-sm">
              [2] Intel Corporation. (2018). <em>Intel Analysis of Speculative Execution Side Channels</em>. 
              White Paper, Revision 1.0. Intel Security Advisory INTEL-SA-00088.
            </p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="text-gray-700 text-sm">
              [3] Gruss, D., Lipp, M., Schwarz, M., Fellner, R., Maurice, C., & Mangard, S. (2017). 
              <em>KASLR is Dead: Long Live KASLR</em>. In International Symposium on Engineering Secure Software 
              and Systems (pp. 161-176). Springer.
            </p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="text-gray-700 text-sm">
              [4] Canella, C., Van Bulck, J., Schwarz, M., Lipp, M., Von Berg, B., Ortner, P., Piessens, F., 
              Evtyushkin, D., & Gruss, D. (2019). <em>A Systematic Evaluation of Transient Execution Attacks and 
              Defenses</em>. In 28th USENIX Security Symposium (USENIX Security 19), pp. 249-266.
            </p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="text-gray-700 text-sm">
              [5] Horn, J. (2018). <em>Speculative Execution, Variant 3: Rogue Data Cache Load (Meltdown)</em>. 
              Google Project Zero Blog. Technical disclosure and analysis.
            </p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="text-gray-700 text-sm">
              [6] Yarom, Y., & Falkner, K. (2014). <em>FLUSH+RELOAD: A High Resolution, Low Noise, L3 Cache 
              Side-Channel Attack</em>. In 23rd USENIX Security Symposium (USENIX Security 14), pp. 719-732.
            </p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="text-gray-700 text-sm">
              [7] Gruss, D., Spreitzer, R., & Mangard, S. (2015). <em>Cache Template Attacks: Automating Attacks 
              on Inclusive Last-Level Caches</em>. In 24th USENIX Security Symposium (USENIX Security 15), pp. 897-912.
            </p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="text-gray-700 text-sm">
              [8] AMD. (2018). <em>Software Techniques for Managing Speculation on AMD Processors</em>. 
              AMD Technical Whitepaper, Revision 7.10.18.
            </p>
          </div>
        </div>
      )
    };
    return content[id] || null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Meltdown Attack</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Breaking Kernel Memory Isolation Through Speculative Execution Side Channels
          </p>
          <p className="text-sm text-blue-200 mt-4">CVE-2017-5754 | Microarchitectural Security Research</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: 'report', label: 'Academic Report', icon: FileText },
              { id: 'pdf', label: 'PDF Report', icon: FileDown },
              { id: 'demo', label: 'Video Demonstration', icon: Video },
              { id: 'team', label: 'Team & Ethics', icon: Users }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'report' && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Report Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8">
              <h2 className="text-3xl font-bold mb-3">
                Meltdown: Exploiting Speculative Execution for Kernel Memory Disclosure
              </h2>
              <p className="text-gray-300 text-sm mb-4">
                A Technical Analysis of CVE-2017-5754 and Cache-Based Timing Side Channels
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <span>📄 Academic Tutorial Report</span>
                <span>📊 Word Count: ~1,850</span>
                <span>🔬 Controlled Lab Environment</span>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="p-8 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Table of Contents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all text-left"
                  >
                    <section.icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{section.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Report Sections */}
            <div className="p-8">
              {sections.map((section) => (
                <div key={section.id} className="mb-6">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <section.icon className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
                    </div>
                    {expandedSection === section.id ? (
                      <ChevronUp className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  {expandedSection === section.id && (
                    <div className="mt-4 p-6 bg-white rounded-lg border border-gray-200 animate-fade-in">
                      <SectionContent id={section.id} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pdf' && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <FileDown className="w-8 h-8" />
                    <h2 className="text-3xl font-bold">Full PDF Report</h2>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Complete academic report on Meltdown vulnerability
                  </p>
                </div>
                <a
                  href="/activity13/Meltdown_Report.pdf"
                  download="Meltdown_Report_Sharique_Maira.pdf"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FileDown className="w-5 h-5" />
                  Download PDF
                </a>
              </div>
            </div>
            
            <div className="p-8">
              {/* PDF Viewer */}
              <div className="bg-gray-100 rounded-lg overflow-hidden" style={{ height: '80vh' }}>
                <iframe
                  src="/activity13/Meltdown_Report.pdf"
                  className="w-full h-full"
                  title="Meltdown Report PDF"
                  style={{ border: 'none' }}
                />
              </div>
              
              {/* Alternative viewing options */}
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Viewing Options</h3>
                <div className="text-blue-800 text-sm space-y-2">
                  <p>If the PDF doesn't display properly:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      <a 
                        href="/activity13/Meltdown_Report.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Open in new tab
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/activity13/Meltdown_Report.pdf" 
                        download="Meltdown_Report_Sharique_Maira.pdf"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Download PDF file
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'demo' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Video className="w-8 h-8 text-red-600" />
                <h2 className="text-3xl font-bold text-gray-800">Attack Demonstration Video</h2>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-8 mb-6">
                <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                  {/* Option 1: Local video file (place your video in public/videos/ folder) */}
                  {/* Uncomment the video tag below and comment out the placeholder */}
                  {/* <video controls className="w-full h-full">
                    <source src="/activity13/videos/demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video> */}
                  
                  {/* Option 2: YouTube video (replace VIDEO_ID with your YouTube video ID) */}
                  {/* <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/VIDEO_ID"
                    title="Meltdown Attack Demonstration"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe> */}
                  
                  {/* Placeholder - Remove this when you add your video */}
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-400">
                      <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Video demonstration placeholder</p>
                      <p className="text-sm mt-2">Place your video file in: <code className="bg-gray-700 px-2 py-1 rounded">public/videos/demo.mp4</code></p>
                      <p className="text-xs mt-4 text-gray-500">
                        Or use YouTube embed (see code comments)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Controlled Environment Notice</h3>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    This demonstration was conducted in an isolated virtual machine environment using intentionally 
                    vulnerable hardware and software configurations. The techniques shown are for educational purposes 
                    only. Unauthorized access to computer systems violates computer fraud and abuse laws in most 
                    jurisdictions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-purple-600" />
                <h2 className="text-3xl font-bold text-gray-800">Team Information</h2>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Team</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="font-semibold text-gray-800">Sharique Baig</p>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Role:</strong> Research & Implementation Lead<br/>
                      <strong>Contributions:</strong> Vulnerability analysis, PoC development, code implementation, technical documentation
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="font-semibold text-gray-800">Maira Aijaz</p>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Role:</strong> Documentation & Video Production<br/>
                      <strong>Contributions:</strong> Academic report writing, demonstration recording, mitigation research, testing validation
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Ethical Research Statement
                </h3>
                <div className="text-green-800 text-sm space-y-3">
                  <p>
                    This research project was conducted with strict adherence to ethical guidelines for security research:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>All testing performed in isolated, controlled laboratory environment</li>
                    <li>No exploitation of production systems or unauthorized access attempted</li>
                    <li>Vulnerable systems used were specifically configured for educational purposes</li>
                    <li>No real user data or systems were compromised during this research</li>
                    <li>Results shared responsibly for educational advancement only</li>
                    <li>Compliance with university research ethics guidelines</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-3">Testing Environment Specifications</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Operating System:</p>
                    <p className="text-gray-600">Ubuntu 16.04 LTS (Vulnerable)</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Processor:</p>
                    <p className="text-gray-600">Intel Core (Pre-2018, Vulnerable to Meltdown)</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Kernel Version:</p>
                    <p className="text-gray-600">Pre-KPTI (Unpatched)</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Isolation:</p>
                    <p className="text-gray-600">Virtual Machine (Network Isolated)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Course Information</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Course:</strong> Computer Security</p>
                <p><strong>Assignment:</strong> Microarchitectural Security: Attack Simulation</p>
                <p><strong>Topic:</strong> Meltdown (CVE-2017-5754)</p>
                <p><strong>Submission Date:</strong> November 28, 2025</p>
                <p><strong>Institution:</strong> Institute of Business Administration</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm">
            © 2024 Microarchitectural Security Research Project | For Educational Purposes Only
          </p>
          <p className="text-xs text-gray-500 mt-2">
            This presentation is part of an academic assignment on hardware security vulnerabilities
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeltdownReport;
