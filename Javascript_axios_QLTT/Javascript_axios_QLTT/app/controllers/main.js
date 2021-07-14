var serviceUser = new ServiceUser();
var validator = new Validator();
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

var arrTaiKhoan = [];
console.log(arrTaiKhoan);
var layDanhSachTaiKhoan = function () {
  arrTaiKhoan;
  serviceUser
    .layDSND()
    .then(function (result) {
      for (var i = 0; i <= result.data.length; i++) {
        var taiKhoan = result.data[i].taiKhoan;
        arrTaiKhoan.push(taiKhoan);
      }
    })
    .catch(function (error) {});
};
layDanhSachTaiKhoan();

var themNguoiDung = function (ND) {
  var taiKhoan = getElm("TaiKhoan").value;
  var hoTen = getElm("HoTen").value;
  var matKhau = getElm("MatKhau").value;
  var email = getElm("Email").value;
  var hinhAnh = getElm("HinhAnh").value;
  var loaiNguoiDung = getElm("loaiNguoiDung").value;
  var loaiNgonNgu = getElm("loaiNgonNgu").value;
  var moTa = getElm("MoTa").value;

  var isValid = true;
  isValid = validator.kiemTraOP(
    loaiNguoiDung,
    "tbLoaiND",
    "Vui lòng chọn người dùng"
  );
  isValid = validator.kiemTraOP(
    loaiNgonNgu,
    "tbNgonNgu",
    "Vui lòng chọn loại ngôn ngữ"
  );
  isValid &= validator.kiemTraRong(taiKhoan, "tbTKND", "Không được để rỗng");
  isValid &=
    validator.kiemTraRong(hoTen, "tbHoTen", "Không được để rỗng") &&
    validator.kiemTraChuoi(
      hoTen,
      "tbHoTen",
      "Không được chứa số hoặc ký tự đặc biệt"
    );
  isValid &=
    validator.kiemTraRong(matKhau, "tbMatKhau", "Không được để rỗng") &&
    validator.kiemTraKyTuMK(
      matKhau,
      "tbMatKhau",
      "có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số"
    ) &&
    validator.kiemTraDoDaiKiTu(
      matKhau,
      "tbMatKhau",
      "Vui lòng nhập từ 6 -8 ký tự",
      6,
      8
    );
    if(!isValid) return
  isValid &=
    validator.kiemTraRong(email, "tbEmail", "Không được để rỗng") &&
    validator.kiemTraKiTuEmail(email, "tbEmail", "Email không đúng kí tự");
  isValid = validator.kiemTraRong(hinhAnh, "tbHinhAnh", "Không được để rỗng");
  isValid &=
    validator.kiemTraRong(moTa, "tbMoTa", "Không được để rỗng") &&
    validator.kiemTraDoDaiKiTu(
      moTa,
      "tbMoTa",
      "Không được quá 60 kí tự",
      1,
      60
    );

  if (!isValid) return;
  for (var i = 0; i <= arrTaiKhoan.length; i++) {
    if (taiKhoan == arrTaiKhoan[i]) {
      alert("Tên tài khoản này đã có người sử dụng!! Vui lòng đặt tên khác");
      return taiKhoan;
    }
  }

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
      document.querySelector("#myModal .close").click();
    })
    .catch(function (error) {
      console.log(error);
    });
};

getElm("btnThemNguoiDung").addEventListener("click", function () {
  var modalFooter = document.querySelector(".modal-footer");
  modalFooter.innerHTML = `<button class = 'btn btn-success' id="closeND" onclick="themNguoiDung()">Thêm Người Dùng</button>`;
  getElm("reset").reset();
  getElm("tbTKND").style.display = "none";
  getElm("tbHoTen").style.display = "none";
  getElm("tbMatKhau").style.display = "none";
  getElm("tbEmail").style.display = "none";
  getElm("tbHinhAnh").style.display = "none";
  getElm("tbLoaiND").style.display = "none";
  getElm("tbNgonNgu").style.display = "none";
  getElm("tbMoTa").style.display = "none";
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
  getElm("tbTKND").style.display = "none";
  getElm("tbHoTen").style.display = "none";
  getElm("tbMatKhau").style.display = "none";
  getElm("tbEmail").style.display = "none";
  getElm("tbHinhAnh").style.display = "none";
  getElm("tbLoaiND").style.display = "none";
  getElm("tbNgonNgu").style.display = "none";
  getElm("tbMoTa").style.display = "none";
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
      var isValid = true;
      isValid = validator.kiemTraOP(
        loaiNguoiDung,
        "tbLoaiND",
        "Vui lòng chọn người dùng"
      );
      if (!isValid) return;
      isValid = validator.kiemTraOP(
        loaiNgonNgu,
        "tbNgonNgu",
        "Vui lòng chọn loại ngôn ngữ"
      );
      if (!isValid) return;
      isValid &= validator.kiemTraRong(
        taiKhoan,
        "tbTKND",
        "Không được để rỗng"
      );
      if (!isValid) return;
      isValid &=
        validator.kiemTraRong(hoTen, "tbHoTen", "Không được để rỗng") &&
        validator.kiemTraChuoi(
          hoTen,
          "tbHoTen",
          "Không được chứa số hoặc ký tự đặc biệt"
        );
      if (!isValid) return;
      isValid &=
        validator.kiemTraRong(matKhau, "tbMatKhau", "Không được để rỗng") &&
        validator.kiemTraKyTuMK(
          matKhau,
          "tbMatKhau",
          "có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số"
        ) &&
        validator.kiemTraDoDaiKiTu(
          matKhau,
          "tbMatKhau",
          "Vui lòng nhập từ 6 -8 ký tự",
          6,
          8
        );
      if (!isValid) return;
      isValid &=
        validator.kiemTraRong(email, "tbEmail", "Không được để rỗng") &&
        validator.kiemTraKiTuEmail(email, "tbEmail", "Email không đúng kí tự");
      if (!isValid) return;
      isValid = validator.kiemTraRong(
        hinhAnh,
        "tbHinhAnh",
        "Không được để rỗng"
      );
      if (!isValid) return;
      isValid &=
        validator.kiemTraRong(moTa, "tbMoTa", "Không được để rỗng") &&
        validator.kiemTraDoDaiKiTu(
          moTa,
          "tbMoTa",
          "Không được quá 60 kí tự",
          1,
          60
        );
      if (!isValid) return;
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
          layDanhSachND();

          document.querySelector("#myModal .close").click();
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
