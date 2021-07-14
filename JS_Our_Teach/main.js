var serviceUser = new ServiceUser();
// console.log(serviceUser);

var layDanhSachND = function () {
  serviceUser
    .layDSND()
    .then(function (result) {
        render(result.data);
    })
    .catch(function (error) {
      console.log("lỗi lấy danh sách");
    });
};
layDanhSachND();

var layDanhSachTaiKhoan = function () {
   var arrTaiKhoan = []
   console.log(arrTaiKhoan);
  serviceUser
    .layDSND()
    .then(function (result) {
      for (var i = 0; i <= result.data.length; i++) {
        var taiKhoan = result.data[i].loaiND;
        if(taiKhoan == 'GV') {
            arrTaiKhoan.push(result.data[i]);
            render(arrTaiKhoan)
        }
      }
      
    })
    .catch(function (error) {});
};
layDanhSachTaiKhoan();

function render(mangND) {
  var content = "";
  mangND.map(function (ND, index) {
    content += `
        <div class="card">
        <div class="blog__item">
          <img
            src="${ND.hinhAnh}"
            class="card-img-top"
            alt="..."
          />
        </div>

        <div class="card-body">
          <p class="card-title">${ND.ngonNgu}</p>
          <h4 class="card-text">${ND.hoTen}</h4>
          <p class="card-text">
            ${ND.moTa}
          </p>
        </div>
      </div>
        `;
  });
  document.querySelector(".pp-item").innerHTML = content;
}
