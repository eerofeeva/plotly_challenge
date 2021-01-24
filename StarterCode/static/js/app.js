var samplesNames;
var metadata;
var resultsarray;
var teststring;
var values;
var ids;
var hovertext;

function getResults(sampleId)
{
    resultsarray= metadata.filter(sampleobject => sampleobject.id == sampleId)[0];

    // Use `sample_values` as the values for the bar chart. - my Y values
    values = resultsarray.sample_values;
    // Use `otu_ids` as the labels for the bar chart. - my X values
    ids = resultsarray.otu_ids;     
    // Use `otu_labels` as the hovertext for the chart.
    hovertext = resultsarray.otu_labels;

    console.log(resultsarray);
}

function optionChanged(sampleId)
{
    console.log("selected_sample " + sampleId);
    getResults(sampleId);
    console.log(resultsarray);
    setMetadata();
}

function setMetadata()
{
    var sample_metadata = d3.select("#sample-metadata");
    sample_metadata.html("");
    Object.entries(resultsarray).forEach(([key, value]) => {
        sample_metadata.append("h6").text(`${key}: ${value}`);
    });
}

function setBarChart()
{
    var trace_bar = {
        x: ids,
        y: values,
        text: hoverText,
        type: 'bar',
        orientation: 'h'
    };
 
 Plotly.newPlot('bar', [trace_bar])
}

function setBubbleChart(sample)
{
    var trace_bubble = {
        x: ids,
        y: values,
        text: hoverText,
        mode: 'markers',
        marker: {
            size: values,
            color: ids
        }
    };
    Plotly.newPlot('bubble', [trace_bubble]);
}

function init()
{
   //initialize selector
   var selDataset = d3.select("#selDataset");
    console.log(samplesNames[0]);
    samplesNames.forEach((sample) => {
    selDataset
      .append("option")
      .text(sample)
      .property("value", sample);
    });

    //initialize metadata through optionChanged
    getResults(samplesNames[0]);
    setMetadata();
    //initialize bar chart
    setBarChart();    

    //initialize bubble chart
    //setBubbleChart(samplesNames[0]);
}


//assign samples and metadata globals
d3.json("samples.json").then(function(data) {
    samplesNames = data.names;
    metadata = data.metadata;
    init();
});
