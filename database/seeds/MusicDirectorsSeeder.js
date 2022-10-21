require('dotenv').config();

var MongoClient = require('mongodb').MongoClient;

const url = process.env.DB_URI;
MongoClient.connect(url, async function(err, db) {
    if (err) throw err;
    const dbo = await db.db("test");
    const data = [
        {
            name: "A.R.Rahman",
            image: "https://github.com/PrathapDev7/Music_track_links/raw/master/images/Music-Directors/a-r-rahman.jpeg",
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        },
        {
            name: "Anirudh Ravichander",
            image: "https://github.com/PrathapDev7/Music_track_links/raw/master/images/Music-Directors/anirudh-ravichander.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        },
        {
            name: "D.Imman",
            image: "https://github.com/PrathapDev7/Music_track_links/raw/master/images/Music-Directors/d-imman.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        },
        {
            name: "Devi Sri Prasad",
            image: "https://github.com/PrathapDev7/Music_track_links/raw/master/images/Music-Directors/devi-sri-prasad.jpeg",
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        },
        {
            name: "G.V.Prakash Kumar",
            image: "https://github.com/PrathapDev7/Music_track_links/raw/master/images/Music-Directors/g-v-prakash-kumar.jpeg",
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        },
        {
            name: "Ghibran",
            image: "https://github.com/PrathapDev7/Music_track_links/raw/master/images/Music-Directors/ghibran.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        },
        {
            name: "Harris Jayaraj",
            image: "https://github.com/PrathapDev7/Music_track_links/raw/master/images/Music-Directors/harris-jayaraj.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        },
        {
            name: "A.R.Rahman",
            image: "https://github.com/PrathapDev7/Music_track_links/raw/master/images/Music-Directors/a-r-rahman.jpeg",
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        },
        {
            name: "Ilayaraja",
            image: "https://github.com/PrathapDev7/Music_track_links/raw/master/images/Music-Directors/ilaiyaraaja.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        },
        {
            name: "S.P.Balasubramaniyam",
            image: "https://github.com/PrathapDev7/Music_track_links/raw/master/images/Music-Directors/s-p-balasubrahmanyam.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        },
        {
            name: "S.Thaman",
            image: "https://github.com/PrathapDev7/Music_track_links/raw/master/images/Music-Directors/s-thaman.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        },
        {
            name: "Santhosh Narayanan",
            image: "https://github.com/PrathapDev7/Music_track_links/raw/master/images/Music-Directors/santhosh-narayanan.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        },
        {
            name: "Vidya Sagar",
            image: "https://github.com/PrathapDev7/Music_track_links/raw/master/images/Music-Directors/vidya-sagar.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        },
        {
            name: "Yuvan Shankar Raja",
            image: "https://github.com/PrathapDev7/Music_track_links/raw/master/images/Music-Directors/yuvan-shankar-raja.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        },

    ];
    await dbo.listCollections({name: 'musicdirectors'})
        .next(async function (err, collinfo) {
            if (collinfo) {
                await dbo.collection("musicdirectors").drop();
            }

            await dbo.collection("musicdirectors").insertMany(data, function (err, res) {
                console.log(res);
                if (err) throw err;
                console.log("musicDirectors seeding done.");
                db.close();
            });
        });
});
