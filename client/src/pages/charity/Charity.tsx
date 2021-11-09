import { Container } from "react-bootstrap";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import styles_main from "./Charity.module.css";

export default function Charity() {
  return (
    <>
      <HeaderTitle
        text="Jak pomóc?"
        image="https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF-1200-80.jpg"
      />
      <Container fluid className={styles_main["main-container"]}>
        <div className={styles_main["main-content"]}>
          <details className={styles_main["details-row"]}>
            <summary className={styles_main["details-summary"]}>
              <p className={styles_main["details-summary-title"]}>Przekaż 1% podatku</p>
            </summary>
            <p className={styles_main["details-main-text"]}>
              <div className={styles_main["details-headers"]}>
                Dlaczego 1% jest taki potrzebny Schronisku?
              </div>
              Dzięki wsparciu, które otrzymujemy w ramach 1%, możemy kupić m.in.:
              <br />
              <br />
              <ul>
                <li>bardzo dobrą i potrzebną karmę specjalistyczną dla zwierząt,</li>
                <li>
                  wyposażenie gabinetu weterynaryjnego - np. specjalistyczny i nowoczesny
                  sprzęt pomagający ratować zwierzęta,
                </li>
                <li>leki dla naszych podopiecznych,</li>
                <li>środki medyczne i wiele wiele innych!</li>
              </ul>
              <div className={styles_main["details-headers"]}>
                Jak przekazać 1% Schronisku?
              </div>
              Wypełniając swoją deklarację umieść nasz numer KRS oraz niezbędny dopisek:
              <div className={styles_main["details-important"]}>
                Numer KRS: 0000154454
                <br />Z dopiskiem: „Dla Schroniska we Wrocławiu”
              </div>
            </p>
          </details>

          <details className={styles_main["details-row"]}>
            <summary className={styles_main["details-summary"]}>
              <p className={styles_main["details-summary-title"]}>Pomoc finansowa</p>
            </summary>
            <p className={styles_main["details-main-text"]}>
              Schronisko we Wrocławiu to bardzo duży obiekt, w którym jednorazowo przebywa
              nawet 300 zwierząt. Utrzymanie ich jest kosztowne i wymagające, zwłaszcza że
              często trafiają do nas chorzy czy zaniedbani podopieczni.
              <br />
              <b>Każda złotówka jest dla nas ważna i potrzebna.</b>
              <br />
              Dzięki Twojemu wsparciu możemy utrzymywać podopiecznych i zapewnić im
              odpowiednie warunki. Jeśli chcesz nas wesprzeć finansowo, możesz to zrobić w
              Schronisku na miejscu, bądź przelewem bankowym.
              <br />
              <br />
              TOZ Schronisko dla Bezdomnych Zwierząt
              <br />
              ul. Ślazowa 2, 51-007 Wrocław
              <br />
              Numer konta bankowego:
              <div className={styles_main["details-important"]}>
                Numer KRS: 0000154454
                <br />
                84 1020 5242 0000 2402 0018 6742
              </div>
              <b>Dziękujemy!</b>
            </p>
          </details>

          <details className={styles_main["details-row"]}>
            <summary className={styles_main["details-summary"]}>
              <p className={styles_main["details-summary-title"]}>Pomoc materialna</p>
            </summary>
            <p className={styles_main["details-main-text"]}>
              Chętnie przyjmujemy <b>dary materialne</b>. Możesz je do nas przynieść w
              godzinach pracy Biura Adopcji, bądź później –{" "}
              <b>dary można powierzyć ochroniarzowi</b>, który po zamknięciu schroniska
              sprawuje opiekę nad obiektem.
              <p className={styles_main["details-main-text"]}>
                <div className={styles_main["details-headers"]}>Karmy dla zwierząt</div>
                Prosimy o przynoszenie karmy mokrej i suchej, zarówno dla psów, jak i
                kotów. Prosimy o zakup karmy ze średniej półki. Karmy najtańsze pochodzące
                z dyskontów nie są chętnie zjadane przez nasze zwierzaki. Nie mamy jednej
                firmy, której produkty preferujemy - ważne tylko, aby pożywienie było
                odżywcze i wartościowe dla zwierząt.
                <div className={styles_main["details-important"]}>
                  Lepiej kupić kilogram dobrej jakości karmy, niż 10 kilogramów
                  bezwartościowego pożywienia.
                  <br />
                  <br />
                </div>
                <b>Do schroniska można także przynieść:</b>
                <ul>
                  <li>środki czystości (środki do mycia wszelkiego typu),</li>
                  <li>koce i ręczniki,</li>
                  <li>obroże, smycze, kagańce,</li>
                  <li>zabawki dla zwierząt (np. piłki, myszki dla kotów, szarpaki),</li>
                  <li>drapaki dla kotów,</li>
                  <li>przysmaki,</li>
                  <li>warzywa, owoce i suchy chleb dla owiec, świni i kaczek.</li>
                </ul>
                <br />
                <b>
                  Czego <u>nie przynosić</u> do schroniska:
                </b>
                <ul>
                  <li>materaców, wykładzin i dywanów,</li>
                  <li>karmy dyskontowej dla zwierząt,</li>
                  <li>mięsa,</li>
                  <li>bannerów,</li>
                  <li>kołder i poduszek z pierzem,</li>
                  <li>maskotek dla dzieci,</li>
                  <li>kolorowych gazet,</li>
                  <li>ubrań dla ludzi.</li>
                </ul>
                <div className={styles_main["details-important"]}>
                  Bardzo dziękujemy za każdą formę wsparcia!
                </div>
              </p>
            </p>
          </details>
        </div>
      </Container>
    </>
  );
}
