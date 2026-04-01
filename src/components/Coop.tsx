// Figma node 47-2028 — each logo is composed of SVG vector fragments
// Structure: .coop-logo-wrap (relative, overflow:hidden) > div (absolute inset) > img (fills wrapper)

type VecProps = { src: string; t: string; r: string; b: string; l: string }
function Vec({ src, t, r, b, l }: VecProps) {
  return (
    <div style={{ position: 'absolute', top: t, right: r, bottom: b, left: l }}>
      <img alt="" src={src} style={{ position: 'absolute', display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
    </div>
  )
}

export default function Coop() {
  return (
    <section className="coop">
      <div className="coop-logos">

        {/* Google — 113×48 */}
        <div className="coop-logo-wrap" style={{ width: 113 }}>
          <Vec src="/img/coop/vec00.svg" t="34.18%" r="57.31%" b="27.3%"  l="26.27%" />
          <Vec src="/img/coop/vec01.svg" t="34.18%" r="39.6%"  b="27.3%"  l="43.98%" />
          <Vec src="/img/coop/vec02.svg" t="34.18%" r="22.64%" b="10.04%" l="61.68%" />
          <Vec src="/img/coop/vec03.svg" t="15.07%" r="17.01%" b="28.48%" l="79.49%" />
          <Vec src="/img/coop/vec04.svg" t="34.17%" r="0.41%"  b="27.31%" l="84.5%"  />
          <Vec src="/img/coop/vec05.svg" t="12.87%" r="75.12%" b="27.31%" l="0.12%"  />
        </div>

        {/* Trello — 113×48 */}
        <div className="coop-logo-wrap" style={{ width: 113 }}>
          <Vec src="/img/coop/vec06.svg" t="25%"    r="79.97%" b="27.88%" l="0"      />
          <Vec src="/img/coop/vec07.svg" t="28.45%" r="58.5%"  b="27.88%" l="27.91%" />
          <Vec src="/img/coop/vec08.svg" t="37.63%" r="48.64%" b="27.88%" l="43.04%" />
          <Vec src="/img/coop/vec09.svg" t="25%"    r="24.66%" b="27.61%" l="69.33%" />
          <Vec src="/img/coop/vec10.svg" t="25%"    r="16.07%" b="27.61%" l="77.91%" />
          <Vec src="/img/coop/vec11.svg" t="37.43%" r="0.17%"  b="27.08%" l="85.91%" />
          <Vec src="/img/coop/vec12.svg" t="37.41%" r="33.9%"  b="27.2%"  l="52.89%" />
        </div>

        {/* Productboard — 230×48 */}
        <div className="coop-logo-wrap" style={{ width: 230 }}>
          <Vec src="/img/coop/vec13.svg" t="55.38%" r="89.18%" b="19.1%"  l="0"      />
          <Vec src="/img/coop/vec14.svg" t="29.86%" r="89.18%" b="44.62%" l="0"      />
          <Vec src="/img/coop/vec15.svg" t="29.86%" r="83.77%" b="19.1%"  l="5.41%"  />
          <Vec src="/img/coop/vec16.svg" t="25%"    r="0.58%"  b="16.67%" l="21.81%" />
        </div>

        {/* Pendo — 128×48 */}
        <div className="coop-logo-wrap" style={{ width: 128 }}>
          <Vec src="/img/coop/vec17.svg" t="23.3%"  r="0"      b="16.2%"  l="25%"    />
          <Vec src="/img/coop/vec18.svg" t="30.71%" r="79.17%" b="14.97%" l="0"      />
        </div>

        {/* Airwallex — 168×48 */}
        <div className="coop-logo-wrap" style={{ width: 168 }}>
          <Vec src="/img/coop/vec19.svg" t="25.07%" r="0.18%"  b="27.08%" l="23.25%" />
          <Vec src="/img/coop/vec20.svg" t="25%"    r="79.49%" b="27.15%" l="0"      />
        </div>

        {/* Amazon — 110×48 */}
        <div className="coop-logo-wrap" style={{ width: 110 }}>
          <Vec src="/img/coop/vec21.svg" t="66.48%" r="33.16%" b="6.25%"  l="14.01%" />
          <Vec src="/img/coop/vec22.svg" t="25%"    r="0.45%"  b="34.39%" l="0"      />
        </div>

      </div>
    </section>
  )
}
