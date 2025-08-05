import { vipnagorgialla } from "@/components/Vipnagorgialla";

export default function Rulebook() {
  return (
    <div className="flex flex-col min-h-[90vh] m-6 mt-16 md:m-16">
      <h1
        className={`text-5xl sm:text-6xl ${vipnagorgialla.className} font-bold italic uppercase text-[#2A2C3F] dark:text-[#EEE5E5] mt-8 mb-4`}
      >
        Kodukord
      </h1>
      <ol className="list-decimal ml-6 text-xl text-[#2A2C3F] dark:text-[#EEE5E5] y-4">
        <li>
          Keelatud on:
          <ol className="list-[lower-alpha] ml-6 y-2">
            <li>alkoholi ja uimastite omamine ja tarbimine ürituse vältel</li>
            <li>alkoholijoobes või uimastite mõju all viibimine üritusel</li>
            <li>
              suitsetamine (ka e-sigaret) selleks mitte ettenähtud kohtades –
              suitsetada võib suitsuruumis või õues vastava prügikasti juures
              <ul className="list-disc ml-6">
                <li>suitsetamine alaealistel</li>
                <li>mokatubaka kasutamine TalTech-i territooriumil</li>
              </ul>
            </li>
            <li>külm- ja imitatsioonrelvad</li>
            <li>
              ürituse alal igasuguse vägivalla kasutamine teiste ja teiste vara
              suhtes
            </li>
            <li>teiste vara omavoliline kasutamine, näppimine</li>
            <li>turniiri reeglitele mittevastavalt mängimine</li>
            <li>
              omavoliline taristu (võrgu) näppimine – võrguprobleemidega tuleb
              pöörduda korraldajate poole
            </li>
            <li>
              mängimiseks ebavajalike seadmete ühendamine vooluvõrku (nt
              veekeetja, puhur, sirgendaja)
            </li>
          </ol>
        </li>
        <li>Iga külastaja vastutab enda asjade ja vara eest ise</li>
        <li>
          Korraldajale varalise kahju tekitanud külastaja on kohustatud korvama
          täies ulatuses tekitatud kahju
        </li>
        <li>
          Magamiseks ettenähtud ajal ja magamiseks ettenähtud ruumis tuleb olla
          vaikselt ja võimaldada kaas mängijatel magada
        </li>
        <li>Korraldajad ei vastuta külastajate eest</li>
        <li>
          Mängijad on TipiLAN-il kohustatud kinni pidama mängule seatud
          vanusepiirangutest
        </li>
      </ol>
      <p className="text-xl text-[#2A2C3F] dark:text-[#EEE5E5] y-4 mt-4">
        NB! Reeglite rikkumise puhul on korraldajatel õigus mängija (koos tema
        meeskonnaga) eemaldada ja rakendada edasist keeldu TipiLAN-i üritustelt.
      </p>
    </div>
  );
}
