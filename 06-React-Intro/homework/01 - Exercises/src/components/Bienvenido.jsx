import React from "react";
import Botones from './Botones'
const studentName = "Rodrigo";
const techSkills = ["Html", "Css", "JavaScript", "React", "Redux"];
const alerts = { m1: "Aprobado", m2: "En curso" };

export default function Bienvenido() {
  // el código de tu componente acá
  return <div>
    <h1>Datos</h1>
    <h3>{studentName}</h3>
    <Botones
      alerts={alerts}
    />
    <ul>
      {techSkills.map((skillItem, i) => {
        return (<li id={`techSkill${i}`} key={`techSkill${i}`}> {skillItem}</li>)
      })
      }
    </ul>
    <ol>
    </ol>
  </div>;
}



// Esto lo exportamos para los tests
export { studentName, techSkills, alerts };
