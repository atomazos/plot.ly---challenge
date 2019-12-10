var data;

d3.json("data/samples.json").then((incomingData) => {
    data = incomingData;
    
init();
});

function init() {
    // code to populate dropdown menu goes here
    var name = data.names;
    var selector = d3.select("#selDataset");
    name.forEach(sample => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
    });
    optionChanged(data.names[0]);

}

function metaData(sample) {
    // code for metadata goes here

    var selectedMetaData = data.metadata.filter(obj => obj.id == sample)[0];
    console.log(selectedMetaData);
    // var id = selectedMetaData.id;
    // console.log(id);
    // var ethnicity = selectedMetaData.ethnicity;
    // console.log(ethnicity);
    // var gender = selectedMetaData.gender;
    // console.log(gender);
    // var age = selectedMetaData.age;
    // console.log(age);
    // var location = selectedMetaData.location;
    // console.log(location);
    // var bbtype = selectedMetaData.bbtype;
    // console.log(bbtype);
    // var wfreq = selectedMetaData.wfreq;
    // console.log(wfreq);
    // var metaList = [id, ethnicity, gender, age, location, bbtype, wfreq];
    var selection = d3.select('#sample-metadata');
    selection.html("");
    Object.entries(selectedMetaData).forEach(([key, value]) => {
        selection.append('div').text(`${key}: ${value}`)
    })
}

function buildPlots(sample) {
    // code for plots goes here
    var selectedSample = data.samples.filter(obj => obj.id == sample)[0];
    // console.log(selectedSample);
    var otu_slice = selectedSample.otu_ids.slice(0, 10);
    // console.log(otu_slice);
    var otu_ids = otu_slice.reverse();
    otu_ids = otu_ids.map(id=>"OTU " + id);
    console.log(otu_ids);
    var sample_slice = selectedSample.sample_values.slice(0, 10);
    var sample_values = sample_slice.reverse();
    // console.log(sample_values);
    var otu_slice= selectedSample.otu_labels.slice(0, 10);
    var otu_labels = otu_slice.reverse();
    // console.log(otu_labels);

// Build Bar chart for dashboard
    var trace1 = {
        x: sample_values,
        y: otu_ids, //don't understand why this works
        text: otu_labels,
        type: "bar",
        orientation: "h",
        marker: {
            color: 'rgb(14,103,121)'
          }
    };
    // data
    var barData = [trace1];
    // Apply the group bar mode to the layout
    var layout = {
        title: "Top 10 OTUs",
        showlegend: false,
        height: 600,
        width: 400,
        
    }
    Plotly.newPlot("bar", barData, layout);

//Build bubble chart for dashboard

var bubbleTrace = {
    x: selectedSample.otu_ids,
    y: selectedSample.sample_values,
    text: selectedSample.otu_labels,
    mode: 'markers',
    marker: {
      color: selectedSample.otu_ids,
      size: selectedSample.sample_values
    }
  };
  
  var bubbleData = [bubbleTrace];
  
  var layout = {
    title: 'Bubble Chart of each Sample',
    showlegend: false,
    height: 600,
    width: 1000,
    xaxis: {title:"OTU ID"}
  };
  
  Plotly.newPlot('bubble', bubbleData, layout);

//Build Gauge
var gaugeMetaData = data.metadata.filter(obj => obj.id == sample)[0];
console.log(gaugeMetaData.wfreq)
var trace = {
    type: "pie",
    showlegend: false,
    hole: 0.4,
    rotation: 180,
    values: gaugeMetaData.wfreq,
    text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8","8-9"],
    direction: "clockwise",
    textinfo: "text",
    textposition: "inside",
    marker: {
      colors: ["rgb(243,249,250)","rgb(219, 233, 235)", "rgb(176, 204, 209)", "rgb(135, 176, 184)", "rgb(109, 151, 167)", "rgb(73, 123, 133)", "rgb(51,101,110)","rgb(37,88,97)", "rgb(22,70,78)"]
    },
    labels: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8","8-9"],
    hoverinfo: "label"
  };
  
  var degrees = 115, radius = .5;
  var radians = degrees * Math.PI / 180;
  var x = -1 * radius * Math.cos(radians);
  var y = radius * Math.sin(radians);
  
  var layout = {
    shapes:[{
        type: 'line',
        x0: 0,
        y0: 0,
        x1: x,
        y1: 0.3,
        line: {
          color: "black",
          width: 4
        }
      }],
    title: 'Belly Button Washing Frequency: Scrubs per week',
    xaxis: {visible: false, range: [-1, 1]},
    yaxis: {visible: false, range: [-1, 1]}
  };
  
  var gaugeData = [trace];
  
  Plotly.plot("gauge", gaugeData, layout);

}

function optionChanged(newSample) {
    // code for what controls dropdown menu
    metaData(newSample);
    buildPlots(newSample);

}

