var samplesNames;
var metadata;
var teststring;

function getSamples(){
    // d3.json("samples.json").then(function(data) {
        
    //     samplesNames = data.samples;
    //     console.log("in getsamples, ");
    //     console.log(samplesNames);
    //     init();
    // });
};

function getMetadata(){
};

function optionChanged(selected_sample)
{
    var resultsarray= metadata.filter(sampleobject => sampleobject.id == sample);
    console.log(resultsarray);
    var sample_metadata = d3.select("#sample-metadata");
    sample_metadata.html("");
    Object.entries(resultsarray[0]).forEach(([key, value]) => {
        sample_metadata.append("h6").text(`${key}: ${value}`);
    });
}

function init()
{
   //initialize selector
   var selDataset = d3.select("#selDataset");

   console.log("in init "); 
   console.log(samplesNames);

   samplesNames.forEach((sample) => {
    selDataset
      .append("option")
      .text(sample)
      .property("value", sample);
    });
    
    //initialize metadata
    getMetadata();
    
    //initialize bar chart
    //initBarChart();    

    //initialize bubble chart
   // initBubbleChart();
}

//initialize the site with all elements
d3.json("samples.json").then(function(data) {
        
    samplesNames = data.samples;
    metadata = data.metadata;
    init();
});
