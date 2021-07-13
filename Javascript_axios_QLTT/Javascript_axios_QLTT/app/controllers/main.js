var serviceUser = new ServiceUser();

const getElm = (id) => document.getElementById(id);

var layDanhSachND = function () {
  serviceUser
    .layDSND()
    .then(function (result) {
      renderTable(result.data);
      setLocalStore(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

layDanhSachND();

var themNguoiDung = function () {
  var taiKhoan = getElm("TaiKhoan").value;
  var hoTen = getElm("HoTen").value;
  var matKhau = getElm("MatKhau").value;
  var email = getElm("Email").value;
  var hinhAnh = getElm("HinhAnh").value;
  var loaiNguoiDung = getElm("loaiNguoiDung").value;
  var loaiNgonNgu = getElm("loaiNgonNgu").value;
  var moTa = getElm("MoTa").value;

  var ND = new NguoiDung(
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiNgonNgu,
    loaiNguoiDung,
    hinhAnh,
    moTa
  );

  serviceUser
    .themNguoiDung(ND)
    .then(function (result) {
      layDanhSachND();
    })
    .catch(function (error) {
      console.log(error);
    });
};

getElm("btnThemNguoiDung").addEventListener("click", function () {
  var modalFooter = document.querySelector(".modal-footer");
  modalFooter.innerHTML = `<button class = 'btn btn-success' onclick="themNguoiDung()">Thêm Người Dùng</button>`;
   getElm('reset').reset()
});

var xoaNguoiDung = function (id) {
  serviceUser
    .xoaND(id)
    .then(function (result) {
      layDanhSachND();
      setLocalStore(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

var xemNguoiDung = function (id) {
  serviceUser
    .xemND(id)
    .then(function (result) {
      var modalFooter = document.querySelector(".modal-footer");
      modalFooter.innerHTML = `<button class='btn btn-success' onclick = "capNhatNguoiDung('${id}')">Cập nhật</button>`;
      var ND = result.data;
      getElm("TaiKhoan").value = ND.taiKhoan;
      getElm("HoTen").value = ND.hoTen;
      getElm("MatKhau").value = ND.matKhau;
      getElm("Email").value = ND.email;
      getElm("HinhAnh").value = ND.hinhAnh;
      getElm("loaiNguoiDung").value = ND.loaiND;
      getElm("loaiNgonNgu").value = ND.ngonNgu;
      getElm("MoTa").value = ND.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
};
var capNhatNguoiDung = function (id) {
  serviceUser
    .capNhatNguoiDung(id)
    .then(function (result) {
      var taiKhoan = getElm("TaiKhoan").value;
      var hoTen = getElm("HoTen").value;
      var matKhau = getElm("MatKhau").value;
      var email = getElm("Email").value;
      var hinhAnh = getElm("HinhAnh").value;
      var loaiNguoiDung = getElm("loaiNguoiDung").value;
      var loaiNgonNgu = getElm("loaiNgonNgu").value;
      var moTa = getElm("MoTa").value;

      var ND = new NguoiDung(
        taiKhoan,
        hoTen,
        matKhau,
        email,
        loaiNgonNgu,
        loaiNguoiDung,
        hinhAnh,
        moTa
      );

      serviceUser
        .capNhatNguoiDung(id, ND)
        .then(function (result) {
            layDanhSachND()

            document.querySelector('#myModal .close').click()
        })
        .catch(function (error) {});
    })
    .catch(function (error) {
      console.log(error);
    });
};
function renderTable(mangND) {
  var content = "";
  mangND.map(function (ND, index) {
    content += `
            <tr>
                <td>${index + 1}</td>
                <td>${ND.taiKhoan}</td>
                <td>${ND.matKhau}</td>
                <td>${ND.hoTen}</td>
                <td>${ND.email}</td>
                <td>${ND.ngonNgu}</td>
                <td>${ND.loaiND}</td>
                <td>
                    <button class = "btn btn-success" data-toggle="modal" data-target="#myModal" onclick="xemNguoiDung('${
                      ND.id
                    }')">Xem thông tin</button>
                    <button class = "btn btn-danger" onclick="xoaNguoiDung('${
                      ND.id
                    }')">Xóa</button>
                </td>
            </tr>
        `;
  });
  getElm("tblDanhSachNguoiDung").innerHTML = content;
}

function setLocalStore(dsnd) {
  localStorage.setItem("DSND", JSON.stringify(dsnd));
}

function getLocalStore() {
  if (localStorage.getItem("DSND")) {
    return JSON.parse(localStorage.getItem("DSND"));
  }
}
getLocalStore();
