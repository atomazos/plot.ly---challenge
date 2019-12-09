var data;


d3.json("data/samples.json").then((incomingData) => {
    data = incomingData;
    // console.log(data);
    d3.selectAll("body").on("change", init());
});



function metaData(sample) {
    // code for metadata goes here
    
    var selectedMetaData = data.metadata.filter(obj => obj.id == sample)[0];
    // console.log(selectedMetaData);
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
    d3.select('#sample-metadata')
        .selectAll('div')
        .data(Object.entries(selectedMetaData))
        // .data(metaList)
        .enter()
        .append('div')
        .text(function (d) {
            return d;
        })
    console.log(selectedMetaData);
}

function buildPlots(sample) {
    // code for plots goes here
    var selectedSample = data.samples.filter(obj => obj.id == sample)[0];
    // console.log(selectedSample);
    var otu_ids = selectedSample.otu_ids.slice(0, 10);
    // console.log(otu_ids);
    var sample_values = selectedSample.sample_values.slice(0, 10);
    // console.log(sample_values);
    var otu_labels = selectedSample.otu_labels.slice(0, 10);
    // console.log(otu_labels);

 
     
      

}
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
function optionChanged(newSample) {
    // code for what controls dropdown menu
    metaData(newSample);
    buildPlots(newSample);
}
