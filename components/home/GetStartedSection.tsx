import Link from 'next/link';

export function GetStartedSection() {
  return (
    <section className="get-started-section">
      <div className="get-started-inner">
        <h2 className="get-started-title">What is RadioDoge?</h2>
        <p>
          RadioDoge is a decentralized communication and data transmission network that enables Dogecoin transactions over radio waves, bypassing the need for traditional internet access. It uses long-distance RF protocols such as LoRa and VaraHF to provide reliable and resilient secure data transmission to reach the Dogecoin blockchain.
        </p>
        <p>
          RadioDoge empowers the unbanked and those in remote areas to access blockchain-based financial services, engage in transactions with neighbors and the world at large, and maintain self-control and self-governance over their finances.
        </p>
        <Link href="/docs/getting-started" className="get-started-link">
          Get Started →
        </Link>
      </div>
    </section>
  );
}
