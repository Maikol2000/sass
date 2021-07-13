function ServiceUser() {
    this.layDSND = function() {
        return axios({
            url: 'https://60d5dbf9943aa60017768c58.mockapi.io/NguoiDung',
            method: 'GET'
        });
    }

    this.themNguoiDung = function(ND) {
        return axios({
            url: 'https://60d5dbf9943aa60017768c58.mockapi.io/NguoiDung',
            method: 'POST',
            data: ND,
        });
    }

    this.xoaND = function(id) {
        return axios({
            url: `https://60d5dbf9943aa60017768c58.mockapi.io/NguoiDung/${id}`,
            method: 'DELETE'
        })
    }

    this.xemND = function(id) {
        return axios({
            url: `https://60d5dbf9943aa60017768c58.mockapi.io/NguoiDung/${id}`,
            method: 'GET'
        })
    }

    this.capNhatNguoiDung = function(id, ND) {
        return axios({
            url: `https://60d5dbf9943aa60017768c58.mockapi.io/NguoiDung/${id}`,
            method: 'PUT',
            data: ND
        })
    }
}

