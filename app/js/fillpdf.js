var options = {
    width: "100%",
    pdfOpenParams: {
        view: 'FitH',
        pagemode: 'thumbs',
        scrollbar: 0,
    }
}



PDFObject.embed("/schedules/day2.pdf", "#schedule", options);

