export const pathFromBezierCurve = (cubicBezierCurve) => {
  const {
    initialAxis,
    initialControlPoint,
    endingControlPoint,
    endingAxis,
  } = cubicBezierCurve;
  return `
        M${initialAxis.x} ${initialAxis.y}
        C ${initialControlPoint.x} ${initialControlPoint.y}
        ${endingControlPoint.x} ${endingControlPoint.y}
        ${endingAxis.x} ${endingAxis.y}
      `;
};

export const getCanvasPosition = (event, svg) => {
  // mouse position on auto-scaling canvas
  // https://stackoverflow.com/a/10298843/1232793

  //const svg = document.getElementById("aliens-go-home-canvas");

  x = event.native.locationX;
  y = event.native.locationY;
  const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse());
  return { x, y };
};

export const poligonPoints = (arr) => {
  const [x1, y1, x2, y2, x3, y3, x4, y4] = arr;
  return `${x1} ${y1}, ${x2} ${y2},${x3} ${y3},${x4} ${y4}`;
};
