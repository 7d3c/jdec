import Link from "next/link";

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="py-6 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-white">DÉCIEUX</span>
            <span className="text-[#e1000f]">.</span>
          </Link>
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="accent-line mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-12">
            Datenschutzerklärung
          </h1>

          <div className="prose prose-invert prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                1. Datenschutz auf einen Blick
              </h2>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Allgemeine Hinweise
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Die folgenden Hinweise geben einen einfachen Überblick darüber,
                was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
                Website besuchen. Personenbezogene Daten sind alle Daten, mit
                denen Sie persönlich identifiziert werden können.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                2. Verantwortlicher
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                Jens Décieux
                <br />
                Rechtsanwalt
                <br />
                [Straße und Hausnummer]
                <br />
                [PLZ] Frankfurt am Main
                <br />
                <br />
                E-Mail: kontakt@decieux.de
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                3. Datenerfassung auf dieser Website
              </h2>

              <h3 className="text-xl font-semibold mb-3 text-white">
                Server-Log-Dateien
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Der Provider der Seiten erhebt und speichert automatisch
                Informationen in so genannten Server-Log-Dateien, die Ihr
                Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="text-gray-400 list-disc list-inside mb-4">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="text-gray-400 leading-relaxed">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird
                nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf
                Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-8 text-white">
                Kontaktaufnahme per E-Mail
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Wenn Sie mir per E-Mail Anfragen zukommen lassen, werden Ihre
                Angaben aus der Anfrage inklusive der von Ihnen dort angegebenen
                Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
                Anschlussfragen bei mir gespeichert. Diese Daten gebe ich nicht
                ohne Ihre Einwilligung weiter.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                4. Hosting
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Diese Website wird bei Vercel Inc. gehostet. Vercel ist ein
                Cloud-Service-Anbieter mit Sitz in San Francisco, USA. Beim
                Besuch dieser Website werden automatisch Daten wie IP-Adresse,
                Browsertyp und Zugriffszeit an Vercel übermittelt und dort
                verarbeitet.
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                Weitere Informationen finden Sie in der Datenschutzerklärung von
                Vercel:{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e1000f] hover:underline"
                >
                  https://vercel.com/legal/privacy-policy
                </a>
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                5. Ihre Rechte
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Sie haben jederzeit das Recht:
              </p>
              <ul className="text-gray-400 list-disc list-inside">
                <li>
                  unentgeltlich Auskunft über Herkunft, Empfänger und Zweck
                  Ihrer gespeicherten personenbezogenen Daten zu erhalten
                </li>
                <li>
                  die Berichtigung oder Löschung dieser Daten zu verlangen
                </li>
                <li>
                  die Einschränkung der Verarbeitung Ihrer personenbezogenen
                  Daten zu verlangen
                </li>
                <li>der Datenverarbeitung zu widersprechen</li>
                <li>
                  unter bestimmten Umständen die Übertragbarkeit Ihrer Daten zu
                  verlangen
                </li>
                <li>
                  sich bei der zuständigen Aufsichtsbehörde zu beschweren
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">
                6. SSL- bzw. TLS-Verschlüsselung
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
                Übertragung vertraulicher Inhalte eine SSL- bzw.
                TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
                daran, dass die Adresszeile des Browsers von „http://" auf
                „https://" wechselt und an dem Schloss-Symbol in Ihrer
                Browserzeile.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Jens Décieux
          </p>
        </div>
      </footer>
    </div>
  );
}
