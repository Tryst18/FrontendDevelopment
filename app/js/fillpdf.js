var options = {
    width: "100%",
    pdfOpenParams: {
        view: 'FitB',
        // zoom: '100, 10, 10',
        pagemode: 'thumbs',
        toolbar: 0,
    }
}

function linkChange(id) {
    console.log(id)
    document.getElementById('download').addEventListener('click', function() {
        window.location.href = "/schedules/"+id+".pdf"
    })
}

PDFObject.embed("/schedules/day0.pdf", "#schedule", options);
linkChange('day0')

for (var x = 0; x<4; x++) {
    document.getElementById('day'+x).addEventListener('click', function(e) {
        PDFObject.embed("/schedules/"+e.target.id+".pdf", "#schedule", options);
        linkChange(e.target.id)
    })
}



// PDFObject.embed("/schedules/day0.pdf", "#schedule", options);
// PDFObject.embed("/schedules/day1.pdf", "#day1", options);
// PDFObject.embed("/schedules/day2.pdf", "#day2", options);
// PDFObject.embed("/schedules/day3.pdf", "#day3", options);

