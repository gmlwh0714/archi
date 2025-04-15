// PDF.js 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

const url = 'pdf/portfolio.pdf'; // 👉 본인의 PDF 파일 경로

let pdfDoc = null;
let pageNum = 1;
const canvas = document.getElementById('pdf-render');
const ctx = canvas.getContext('2d');

// PDF 페이지 렌더링 함수
function renderPage(num) {
  pdfDoc.getPage(num).then(page => {
    const scale = 2.5;  // 이 값을 증가시키면 PDF 크기가 커짐
    const viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    page.render(renderContext);
  });
}

// PDF 문서 로딩
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
  pdfDoc = pdfDoc_;
  renderPage(pageNum);
});

// 클릭으로 페이지 넘기기
document.body.addEventListener('click', (e) => {
  const mid = window.innerWidth / 2;

  if (e.clientX > mid && pageNum < pdfDoc.numPages) {
    pageNum++;
    renderPage(pageNum);
  } else if (e.clientX <= mid && pageNum > 1) {
    pageNum--;
    renderPage(pageNum);
  }
});