export class HelperCommon {
  public static  helper = {
    obtenerIndiceAleatorio: <T>(arr: T[]) => Math.floor(Math.random() * arr.length),
  };

  public  obtenerElementoAleatorio<T>(arr: T[]): T {
    const indiceAleatorio = HelperCommon.helper.obtenerIndiceAleatorio(arr);
    console.log("indiceAleatorio",indiceAleatorio)
    return arr[indiceAleatorio];
  }

  public  repetirElementoAleatorio<T>(arr: T[], minRepeticion: number = 1,maxRepeticion:number=15): T[]{
    const cantidadesAleatorias:T[] = [];
    const numAleatorios = Math.floor(Math.random() * (maxRepeticion - minRepeticion + 1)) + minRepeticion;
    for (let j = 0; j < numAleatorios; j++) {
      const indiceAleatorio = HelperCommon.helper.obtenerIndiceAleatorio(arr);
      cantidadesAleatorias.push(arr[indiceAleatorio])
    }
    return cantidadesAleatorias
  }
}