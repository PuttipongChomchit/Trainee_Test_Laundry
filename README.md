# Trainee Test
Api Trainee Test

## วิธีการ Build

1. git clone https://github.com/PuttipongChomchit/Trainee_Test_Laundry.git
2. cd Trainee_Test_Laundry
3. npm install

## วิธีการ Run

1. npm start

## วิธีการ Test

นำลิ้งค์นี้ http://localhost:3000/ ใส่ในเบราว์เซอร์

เลือกเครื่องซักผ้า

เลือกโหมดการซัก

จากนั้นกดปุ่มเพิ่มจำนวนเงินให้เพียงพอจำนวนเงินค่าใช้จ่าย

กดปุม Submit เพื่อเริ่มทำการซัก

สร้างกลุ่มไลน์

แอด notify-bot เข้ากลุ่มไลน์

---
นำลิ้งค์นี้ http://localhost:3000/api/v1/test/8 ใส่ในเบราว์เซอร์

ผลลัพธ์

```JSON
{
    "member-count": "8",
    "sequence": [
        [
            0,
            1,
            1,
            2,
            3,
            5,
            8,
            13
        ]
    ],
    "total": 33
}
```
