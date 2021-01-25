var samplesNames;
var metadata;
var samples;
var resultsmetadata;
var resultsarray;
var values;
var ids;
var hovertext;

function getResults(sampleId)
{
    resultsarray= samples.filter(sampleobject => sampleobject.id == sampleId)[0];
    resultsmetadata = metadata.filter(sampleobject => sampleobject.id == sampleId)[0];
    // Use `sample_values` as the values for the bar chart. - my Y values
    values = resultsarray.sample_values;
    // Use `otu_ids` as the labels for the bar chart. - my X values
    ids = resultsarray.otu_ids;     
    // Use `otu_labels` as the hovertext for the chart.
    hovertext = resultsarray.otu_labels;
}

function optionChanged(sampleId)
{
    getResults(sampleId);
    setMetadata();
    setBarChart();
    setBubbleChart();
}

function setMetadata()
{
    var sample_metadata = d3.select("#sample-metadata");
    sample_metadata.html("");
    Object.entries(resultsmetadata).forEach(([key, value]) => {
        sample_metadata.append("h6").text(`${key}: ${value}`);
    });
}

function setBarChart()
{
    var trace_bar = {
        y: ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        x: values.slice(0,10).reverse(),
        text: hovertext.slice(0,10).reverse(),
        type: 'bar',
        orientation: 'h'
    };

    var layout = {
        title:'Top 10 Bacterial Cultures',
        margin: {t:30, l: 150}
    };

    Plotly.newPlot('bar', [trace_bar], layout)
}

function setBubbleChart(sample)
{
    var trace_bubble = {
        x: values,
        y: ids,
        text: hovertext,
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
    samplesNames.forEach((sample) => {
    selDataset
      .append("option")
      .text(sample)
      .property("value", sample);
    });

    //set initial metadata
    getResults(samplesNames[0]);
    setMetadata();

    //set initial bar chart
    setBarChart();    

    //set initial bubble chart
    setBubbleChart();
}

//assign samples and metadata globals
d3.json("samples.json").then(function(data) {
    samplesNames = data.names;
    metadata = data.metadata;
    samples = data.samples;
    init();
});
