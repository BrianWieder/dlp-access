import React, { Component } from "react";

class PPTViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pptHeight: null
    };
  }

  async getPdfHeight() {
    const _this = this;
    const loadingTask = pdfjs.getDocument(this.props.manifest_url);
    loadingTask.promise.then(function(pdf) {
      pdf.getPage(1).then(function(page) {
        const viewport = page.getViewport({ scale: 1.5 });
        _this.setState({ pdfHeight: viewport.height + "px" });
      });
    });
  }

  componentDidMount() {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    this.getPdfHeight();
  }

  render() {
    let pdfView = <></>;
    if (this.state.pdfHeight) {
      pdfView = (
        <iframe
          className="pdf-viewer"
          title={this.props.title}
          src={this.props.manifest_url}
          width="100%"
          height={this.state.pdfHeight}
        ></iframe>
      );
    }
    return pdfView;
  }
}
export default PDFViewer;
