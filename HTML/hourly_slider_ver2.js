

var svg = d3.select("#svg1");
    margin = {right: 10, left: 10};
    width = +svg.attr("width") ;
    //- margin.left - margin.right,
   height = +svg.attr("height");

d3.select("#svg1")
//.append("rect").attr("x","300").attr("y","40").attr("width","50").attr("height","20").attr("fill","red")
  .append("text")
    .text("Time (Hours)") .attr("text-anchor", "middle")
                         .attr("x", 300)
                         .attr("y", 45 )
                         .style('font-weight', 'bold')
                         .attr("font-family", "sans-serif")
                         .attr("font-size", "15px")
                         .attr("fill", "black");
var rect1 = d3.select("#svg")
.append("rect").attr("x","50").attr("y","295").attr("width","50").attr("height","20").attr("fill","red");
d3.select("#svg")
.append("text").attr("id","year1")
    .text("2015") .attr("text-anchor", "middle")
                         .attr("x", 72)
                         .attr("y", 312)
                         .style('font-weight', 'bold')
                         .attr("font-family", "sans-serif")
                         .attr("font-size", "15px")
                         .attr("fill", "black");
var x = d3.scaleLinear()
    .domain([0, 24])
    .range([0,width])
    .clamp(true);

var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + height /10+ ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() { hue(x.invert(d3.event.x)); })
        );

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 24 + ")")
  .selectAll("text")
  .data(x.ticks(24))
  .enter().append("text")
    .attr("x", x)
    .attr("text-anchor", "middle")
    .style("font-size","15px")
    .text(function(d) { return d ; });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

slider.transition() // Gratuitous intro!
    .duration(750)
    .tween("hue", function() {

      var i = d3.interpolate(0, 0);
      return function(t) { hue(i(t)); };

    });
    var wait_time="";
//svg.append("circle").attr("id","first").attr("cx","200").attr("cy","50").attr("r","20").attr("fill","red");
function hue(h) {
  handle.attr("cx", x(h));

 // svg.style("background-color", d3.hsl(h, 0.8, 0.8));
  svg.style("background-color", "#5ab4ac");
  
  var abs_hr = Math.floor(h);
 for (i = 0; i < wait_time.length; i++) { 
   
   
    

    hour = wait_time[i].Hour
   // hour = Math.floor()
    if (abs_hr == hour)
    {
    //   console.log("i airport = "+wait_time[i].Airport)
     airport_iata = wait_time[i].Airport;
   // airport_color = wait_time[i].color1;
    avg1 = wait_time[i].AVG;
    avg1 = Math.floor(avg1);

    var circle_color = hr_color["1"];
    if(avg1 >= 0 && avg1 <5)
    {
      circle_color = hr_color["2"];
    }
    else if(avg1 >=5 && avg1 <10)
      circle_color = hr_color["3"];
    else if(avg1 >=10 && avg1 <15)
      circle_color = hr_color["4"];
    else if(avg1 >=15 && avg1 <20)
      circle_color = hr_color["5"];
     else if(avg1 >=20)
         circle_color = hr_color["6"];
    

    //circle_color = hr_color[abs_hr];
    //console.log(wait_time[0].Airport)
   // for(abs_hr)
    d3.select("#svg").select("#"+airport_iata).attr("fill",circle_color);  
  //   d3.select("#svg1").select("#first").attr("fill",circle_color);
  //   console.log("avg = "+avg1+" for hour "+ abs_hr+" color = "+circle_color);
     //break;
   }
  // hour = -1;
 /* else{
      d3.select("#svg").select("#STL").attr("fill", d3.hsl(h*10, 0.8, 0.8)).attr("stroke","red");
      }*/
  }
}
//EWR, 1, hr_color
//if h_csv== 1:
  //airport


var hr_color = {"0":"#ffffb2",
"1":"#fed976",
"2":"#feb24c",
"3":"#fd8d3c",
"4":"#fc4e2a",
"5":"#e31a1c",
"6":"#b10026"};


//var wait_time = d3.csv("hourly_avg_wait_time_color.csv");
var filename = "hourly_avg_wait_time_full_";
var year_number = "2015";
function year_change_2015()
{
  year_number = "2015";
   d3.select("#year1").text("2015");
 // console.log("called year = " + year_number);
  filename = "hourly_avg_wait_time_full_";
  //filename = filename + year_number + ".csv";
  //d3.queue().defer(d3.csv, filename).await(ready);
    readCSVData(year_number);
     hue(0);
}
function year_change_2014()
{
    year_number = "2014";
   // console.log("called year = " + year_number);
    filename = "hourly_avg_wait_time_full_";
    //filename = filename + year_number + ".csv";
   // d3.queue().defer(d3.csv, filename).await(ready);
     readCSVData(year_number);
     d3.select("#year1").text("2014");
   hue(0);
}
function year_change_2013()
{
    year_number = "2013";
     d3.select("#year1").text("2013");
  //  console.log("called year = " + year_number);
    filename = "hourly_avg_wait_time_full_";
   // filename = filename + year_number + ".csv";
    // d3.queue().defer(d3.csv, filename).await(ready);
    readCSVData(year_number);
  hue(0);
}

function readCSVData(year_number) {

//console.log("read csv called = ");
filename = filename + year_number + ".csv";
d3.queue().defer(d3.csv, filename).await(function (error, data) {
    wait_time = data;
   // console.log("first airport = "+wait_time[0].Airport);
});
//d3.queue().defer(d3.csv, filename).await(ready);
//d3.queue().defer(d3.csv, "hourly_avg_wait_time_full_2014.csv").await(ready);
//d3.queue().defer(d3.csv, "hourly_avg_wait_time_full_2013.csv").await(ready);
//ready();
}
function ready(error,data){
 

}
var colorText = ["0 - 5","5 - 10","10 - 15","15 - 20","20+"];
var colorScheme = ["#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"];
var color = ["#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#b10026"];



function createLegend()
{
  
  
  d3.select('body').append('div')
                         .attr('id', 'legendHeader')
                         .style('position', 'absolute')
                         .style('opacity', 1)
             //.style('background-color', 'orange')
                         .text("Avg Wait Time (Mins)")
            .style("text-align","center")
                         .style('width', '350px')
                         .style("left", "550px")
                         .style("top", "10px")
                         .style('line-height', 1)
                         .style('font-weight', 'bold')
                         .style('padding', '3px')
                         .style('color', '#000')
                         .style('border-radius', '2px')
                         .on("click", function () {
                             startAnimation();
                         })
             .on("mouseover", function(d){
              d3.select(this).style("cursor","pointer");
             })
             .on("mouseout", function(d){
              d3.select(this).style("cursor","default");
             });
  
  
  /*svg.append("text")
  .attr("x", width - 180)
    .attr("y", 0)
    .attr("dy", ".25em")
    .style("text-anchor", "start")
    .text("Average Wait Time (W) in Minutes")
  .attr("fill","black")
  .attr("transform","translate(0,10)");*/
  
  var legend = d3.select("#svg").selectAll("legend")
    .data(color)
    .enter().append("g")
    .attr("id","initialLegend")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(10," + i * 20  + ")"; });

    legend.append("rect")
    .attr("x", width-120)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d,i){ return colorScheme[i]; })
  .attr("transform","translate(10,22)"); 

    legend.append("text")
    .attr("x", width - 100)
    .attr("y", 10)
    .attr("dy", ".25em")
  .attr("fill","black")
    .style("text-anchor", "start")
    .text(function(d,i) { return colorText[i]; })
  .attr("transform","translate(10,22)");

}
createLegend();
//console.log(wait_time);
/*
d3.csv("JFK_2013.csv", function(loadedRows) {
  //wait_time = loadedRows;
  console.log("airport  = "+loadedRows[0]); 
});

//console.log(wait_time[]);*/