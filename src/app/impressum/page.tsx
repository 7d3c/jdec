import Link from "next/link";

export default function Impressum() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-12">Impressum</h1>

          <div className="prose prose-invert prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Angaben gemäß § 5 TMG
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Jens Décieux
                <br />
                Rechtsanwalt
                <br />
                [Straße und Hausnummer]
                <br />
                [PLZ] Frankfurt am Main
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">Kontakt</h2>
              <p className="text-gray-400 leading-relaxed">
                E-Mail: kontakt@decieux.de
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Berufsbezeichnung und berufsrechtliche Regelungen
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Berufsbezeichnung: Rechtsanwalt
                <br />
                Verliehen in: Bundesrepublik Deutschland
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                Zuständige Rechtsanwaltskammer:
                <br />
                Rechtsanwaltskammer Frankfurt am Main
                <br />
                Bockenheimer Anlage 36
                <br />
                60322 Frankfurt am Main
              </p>
              <p className="text-gray-400 leading-relaxed">
                Es gelten folgende berufsrechtliche Regelungen:
              </p>
              <ul className="text-gray-400 list-disc list-inside mt-2">
                <li>Bundesrechtsanwaltsordnung (BRAO)</li>
                <li>Berufsordnung für Rechtsanwälte (BORA)</li>
                <li>Fachanwaltsordnung (FAO)</li>
                <li>
                  Rechtsanwaltsvergütungsgesetz (RVG)
                </li>
                <li>
                  Berufsregeln der Rechtsanwälte der Europäischen Union (CCBE)
                </li>
              </ul>
              <p className="text-gray-400 leading-relaxed mt-4">
                Die berufsrechtlichen Regelungen können über die Website der
                Bundesrechtsanwaltskammer (
                <a
                  href="https://www.brak.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e1000f] hover:underline"
                >
                  www.brak.de
                </a>
                ) eingesehen werden.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Berufshaftpflichtversicherung
              </h2>
              <p className="text-gray-400 leading-relaxed">
                [Name und Anschrift der Versicherung]
                <br />
                Räumlicher Geltungsbereich: Deutschland / EU
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                EU-Streitschlichtung
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e1000f] hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Verbraucherstreitbeilegung
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Zur Teilnahme an einem Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle bin ich nicht verpflichtet und
                nicht bereit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">
                Haftung für Inhalte
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene
                Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                verantwortlich. Nach §§ 8 bis 10 TMG bin ich als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                gespeicherte fremde Informationen zu überwachen oder nach
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                hinweisen.
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
