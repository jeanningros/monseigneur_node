if (process.argv.length != 4 || isNaN(process.argv[2]) ||
  isNaN(process.argv[3]) || process.argv[2] < 1 || process.argv[3] <
  1) {
    console.log("Vous devez donner deux arguments.\nEn premier le nombre d'allumettes" + "total (supérieur à 0).\nEn second, le nombre" + 
    "maximum d'allumettes qu'on peut piocher par tour (supérieur à 0).");
    process.exit(84);
}

let entreeStandard = process.stdin;
entreeStandard.setEncoding("utf-8");
let allumettesRestantes = process.argv[2];
let maximumParTour = process.argv[3];


afficheNAllumettes(allumettesRestantes);
console.log(`Combien voulez-vous en prendre ? (entre 1 et ${maximumParTour})`);


entreeStandard.on("data", function (data) {
  if (data !== "\r\n" && data !== "\n") {
    if (isNaN(data)) {
      console.log(`Veuillez donner un nombre, qui de plus
      est compris entre 1 et ${maximumParTour}.\n`);
      return;
    }
    let nbrAllumettes = parseInt(data);
    if (nbrAllumettes < 1 || nbrAllumettes > maximumParTour) {
      console.log(`Veuillez donner un nombre qui est compris
      entre 1 et ${maximumParTour}.\n`);
      return;
    }
    allumettesRestantes -= nbrAllumettes;
    console.log(`Vous avez enlevé ${nbrAllumettes}, il reste${allumettesRestantes}\n`);
    if (allumettesRestantes <= 0) {
      console.log("Fin de la partie ! L'IA gagne !");
      process.exit();
    }
    tourIA();
    if (allumettesRestantes <= 0) {
      console.log("Fin de la partie ! Vous gagnez !");
      process.exit();
    }
  }
  afficheNAllumettes(allumettesRestantes);
  console.log(`Combien voulez-vous en prendre ? (entre 1 et
  ${maximumParTour})`);
});


function afficheNAllumettes(nbr) {
  let str = `Il y a ${nbr} allumettes devant vous\n\t`;
  for (let i = 0; i < nbr; i++)
  str += "| ";
  console.log(str);
}
