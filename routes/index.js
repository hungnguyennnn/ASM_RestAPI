var express = require('express');
var router = express.Router();

// Mảng lưu danh sách xe tạm thời
let cars = [
  { id: 1, name: 'Toyota Corolla', manufacturer: 'Toyota', year: 2020, price: 28000, description: 'Một chiếc sedan nhỏ gọn, tiết kiệm nhiên liệu, thích hợp cho gia đình.' },
  { id: 2, name: 'Honda Civic', manufacturer: 'Honda', year: 2019, price: 32000, description: 'Sedan thể thao, trang bị nhiều tính năng hiện đại, động cơ mạnh mẽ.' },
  { id: 3, name: 'Ford Mustang', manufacturer: 'Ford', year: 2021, price: 35000, description: 'Xe thể thao với thiết kế mạnh mẽ, động cơ V8, dành cho những người yêu thích tốc độ.' }
];

// Trang danh sách xe
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Danh sách xe', cars: cars });
});

// Trang thêm xe
router.get('/add', function(req, res, next) {
  res.render('form', { title: 'Thêm xe' });
});

// Xử lý khi thêm xe
router.post('/add', function(req, res, next) {
  const { name, manufacturer, year, price, description } = req.body;
  const newCar = { id: cars.length + 1, name, manufacturer, year, price, description };
  cars.push(newCar);
  res.redirect('/');
});

// Trang chỉnh sửa xe (GET)
router.get('/cars/update/:id', function(req, res, next) {
  const { id } = req.params;
  const car = cars.find(car => car.id === parseInt(id));

  if (!car) {
    return res.redirect('/'); // Nếu không tìm thấy xe, quay lại trang danh sách xe
  }

  res.render('edit', { title: 'Chỉnh sửa xe', car: car });
});

// Xử lý khi cập nhật xe (POST)
router.post('/cars/update/:id', function(req, res, next) {
  const { id } = req.params;
  const { name, manufacturer, year, price, description } = req.body;

  let car = cars.find(car => car.id === parseInt(id));

  if (!car) {
    return res.redirect('/');
  }

  // Cập nhật thông tin chiếc xe
  car.name = name;
  car.manufacturer = manufacturer;
  car.year = year;
  car.price = price;
  car.description = description;

  res.redirect('/'); // Sau khi cập nhật, quay về trang danh sách xe
});

// Xử lý xóa xe
router.post('/cars/delete/:id', function (req, res, next) {
  const { id } = req.params;
  cars = cars.filter(car => car.id !== parseInt(id));
  res.redirect('/');
});

module.exports = router;
