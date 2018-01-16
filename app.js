/********** the Data **********/
let stressors = {
  "stress": "too much work at job",
  "activity": "meditate",
  "duration": 5,
  "preHeartRate": 80,
  "postHeartRate": 70
};

let stressArr = [
  {typeHR: "preHeartRate", heartRate: 80},
  {typeHR: "postHeartRate", heartRate: 70}
];


/********** drawChart function **********/
function drawChart() {
  /***** Chart dimensions *****/
  // SVG chart will have width & length of parent container element
  let containWidth = parseInt(d3.select(".container").style("width"));
  let containHeight = parseInt(d3.select(".container").style("height"));

  let margin = {top: 20, right: 20, bottom: 30, left: 30};
  let width = containWidth //- margin.left - margin.right;
  let height = containHeight //- margin.top - margin.bottom;

  console.log(containWidth, containHeight);

  /***** X-scale and Y-scale *****/
  let xScale = d3.scaleBand()
                //.domain(["pre-HR", "post-HR"])
                .domain(stressArr.map(d => d.typeHR))
                .range([margin.right + margin.left, width - margin.left])
                .padding(.2); // padding between the discreet bands

  let greaterHR = stressArr.map(d => d.heartRate);
  let scaledGreaterHR = d3.max(greaterHR) //* 1.1;

  let yScale = d3.scaleLinear()
                .domain([0, scaledGreaterHR])
                .range([height - margin.bottom - margin.top, margin.top]);

  /***** X-axis and Y-axis *****/
  let xAxis = d3.axisBottom(xScale);
  let yAxis = d3.axisLeft(yScale);

  /***** append SVG *****/
  let chart = d3.select(".container")
              .append("svg")
                .attr("class", "chart")
                .attr("width", width)
                .attr("height", height);

  /***** append outermost <g> element *****/
  let outerG = chart.append("g")
            //.attr("transform", `translate(${margin.left}, ${margin.top})`)
            //.attr("transform", `translate(0, ${height - margin.bottom})`)
            .attr("class", "parent-Group");

  /* append group for X-axis */
  outerG.append("g")
    .attr("class", "x-axis")
    // Jack M. code line 64 WORKS, differs from Bostock's code
    .attr("transform", `translate(0, ${height - margin.bottom - margin.top})`) //*Jack
    .call(d3.axisBottom(xScale));

  /* append group for Y-axis */
  outerG.append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left + margin.right}, 0)`)
    .call(d3.axisLeft(yScale))

  
  // Append text to X-axis
  outerG.append("text")
    .attr("transform",
      `translate(${width / 2}, ${height * 0.95})`) //EJL
    .style("text-anchor", "middle")
    .attr("class", "x-axis-label")
    .text("heart rates before and after relaxation activity")
  
}



/********** resizeChart function **********/
function resizeChart() {
  /***** Chart dimensions *****/
  // SVG chart will have width & length of parent container element
  let containWidth = parseInt(d3.select(".container").style("width"));
  let containHeight = parseInt(d3.select(".container").style("height"));

  let margin = {top: 20, right: 20, bottom: 30, left: 30};
  let width = containWidth //- margin.left - margin.right;
  let height = containHeight //- margin.top - margin.bottom;

  console.log(containWidth, containHeight);

  /* Using the parent container dimensions, re-draw the SVG.CHART */
  d3.select(".chart")
    .attr("width", width)
    .attr("height", height);


  /***** X-scale and Y-scale, Update the X & Y range scale *****/
  let xScale = d3.scaleBand()
                //.domain(["pre-HR", "post-HR"])
                .domain(stressArr.map(d => d.typeHR))
                .range([margin.right + margin.left, width - margin.left])
                //.range([0, width])
                .padding(.2); // padding between the discreet bands

  let greaterHR = stressArr.map(d => d.heartRate);
  let scaledGreaterHR = d3.max(greaterHR) //* 1.1;

  let yScale = d3.scaleLinear()
    .domain([0, scaledGreaterHR])
    .range([height - margin.top - margin.bottom, 0]);


  /* Update X axis with resized scale */
  d3.select(".x-axis")
    .attr("transform", `translate(0, ${height - margin.bottom - margin.top})`) // Jack**
    .call(d3.axisBottom(xScale));



  /* Update Y axis with resized scale */
  d3.select(".y-axis")
    .attr("transform", `translate(${margin.left + margin.right}, 0)`)
    .call(d3.axisLeft(yScale));



  // Update text to X-axis
  d3.select(".x-axis-label")
    .attr("transform",
      `translate(${width / 2}, ${height * 0.95})`) //EJL
    

}

drawChart();

//window.addEventListener("resize", resizeChart);
d3.select(window).on("resize", resizeChart);


/*
Recommended D3 authors from Eric L:
Nadieh Bremer, Shirley Wu, Currhan
Elijah Meeks (knows D3 and React)

*/








/*
  let chart = d3.select(".chart")
        .attr("width", width)
        .attr("height", height);

  let xScale = d3.scaleBand()
    //.domain(["pre-HR", "post-HR"])
    .domain(stressArr.map(d => d.typeHR))
    .range([0, width])
    .padding(.2); // padding between the discreet bands

    let xAxis = d3.axisBottom(xScale); console.log(typeof xAxis)
  

  chart.attr("width", containWidth)
        .attr("height", containHeight);


  let outerG = d3.select(".parent-Group")
  //.attr("transform", `translate(${margin.left}, ${margin.right})`)
  .attr("transform", `translate(0, ${height - margin.bottom})`)

outerG.call(xAxis)
*/