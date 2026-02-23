import { ClinicPageTemplate } from "../_components/ClinicPageTemplate";
import type { ClinicPageData } from "../_components/ClinicPageTemplate";

const DATA: ClinicPageData = {
  breadcrumbLabel: "Болничка банка крви - трансфузија",
  title: "Болничка банка крви - трансфузија",
  subtitle: "Трансфузиона медицина — обезбеђивање крви и крвних деривата за хируршке и клиничке потребе",
  introIcon: "fas fa-droplet",
  introTitle: "О банци крви",
  introText: "Болничка банка крви обезбеђује снабдевање свих клиника и одељења крвљу, крвним дериватима и компонентама. Тим трансфузиолога врши тестирање крвних група, претрансфузијске пробе и контролу квалитета крвних продуката. Безбедна трансфузија је кључна компонента успешних кардиохируршких и васкуларних интервенција.",
  areas: [
    { icon: "fas fa-droplet", title: "Крвне групе и тестирање", desc: "Одређивање крвних група и претрансфузијска испитивања" },
    { icon: "fas fa-warehouse", title: "Складиштење крви", desc: "Контролисано чување крви и деривата по стандардима" },
    { icon: "fas fa-shield-heart", title: "Безбедност трансфузије", desc: "Вишеструка контрола квалитета и компатибилности" },
    { icon: "fas fa-arrows-rotate", title: "Аутотрансфузија", desc: "Програми прикупљања и враћања сопствене крви пацијента" },
  ],
};

export default function TransfuzijaPage() {
  return <ClinicPageTemplate data={DATA} />;
}
