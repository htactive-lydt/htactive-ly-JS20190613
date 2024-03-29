// Exercise 1: Implement reduce()

Array.prototype.reduce = function(combiner, initialValue) {
    var counter,
        accumulatedValue;

    // If the array is empty, do nothing
    if (this.length === 0) {
        return this;
    } else {
        // If the user didn't pass an initial value, use the first item.
        if (arguments.length === 1) {
            counter = 1;
            accumulatedValue = this[0];
        } else if (arguments.length >= 2) {
            counter = 0;
            accumulatedValue = initialValue;
        } else {
            throw "Invalid arguments.";
        }

        // Loop through the array, feeding the current value and the result of
        // the previous computation back into the combiner function until
        // we've exhausted the entire array and are left with only one value.
        while (counter < this.length) {
            accumulatedValue = combiner(accumulatedValue, this[counter])
            counter++;
        }

        return [accumulatedValue];
    }
};

// Exercise 2: Retrieve the largest rating.

var ratings = [2, 3, 1, 4, 5];

// You should return an array containing only the largest rating. Remember that reduce always
// returns an array with one item.
console.log(ratings.reduce((larger, curr) => (curr > larger) ? curr : larger, 0))

// Exercise 3: Retrieve url of the largest boxart

var boxarts = [
    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
    { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
    { width: 425, height: 150, url: "http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
];

// You should return an array containing only the URL of the largest box art. Remember that reduce always
// returns an array with one item.
listBoxart = boxarts.reduce((largest, curr) =>
        (curr.width * curr.height > largest.width * largest.height) ? curr : largest)
    .map(boxart => boxart.url);
console.log(listBoxart);

// Exercise 4: Reducing with an initial value

var videos = [{
        "id": 65432445,
        "title": "The Chamber"
    },
    {
        "id": 675465,
        "title": "Fracture"
    },
    {
        "id": 70111470,
        "title": "Die Hard"
    },
    {
        "id": 654356453,
        "title": "Bad Boys"
    }
];

// Expecting this output...
// [
//	 {
//		 "65432445": "The Chamber",
//		 "675465": "Fracture",
//		 "70111470": "Die Hard",
//		 "654356453": "Bad Boys"
//	 }
// ]
video = videos.
reduce((accumulatedMap, video) => {
        var obj = {};

        obj[video.id] = video.title;

        // Object.assign() takes all of the enumerable properties from
        // the object listed in its second argument (obj) and assigns them
        // to the object listed in its first argument (accumulatedMap).
        return Object.assign(accumulatedMap, obj);
    },
    // Use an empty map as the initial value instead of the first item in
    // the list.
    {});
console.log(video);

Array.prototype.concatAll = function() {
    var results = [];
    this.forEach(function(subArray) {
        subArray.forEach(function(itemInSubArray) {
            results.push(itemInSubArray)
        });
    });

    return results;
};

Array.prototype.concatMap = function(projectionFunctionThatReturnsArray) {
    return this.
    map(function(item) {
            return projectionFunctionThatReturnsArray(item);
        }).
        // apply the concatAll function to flatten the two-dimensional array
    concatAll();
};

// Exercise 5: Retrieve the id, title, and smallest box art url for every video.

var movieLists = [{
        name: "New Releases",
        videos: [{
                "id": 70111470,
                "title": "Die Hard",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 654356453,
                "title": "Bad Boys",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                    { width: 140, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }

                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    },
    {
        name: "Thrillers",
        videos: [{
                "id": 65432445,
                "title": "The Chamber",
                "boxarts": [
                    { width: 130, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 675465,
                "title": "Fracture",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                    { width: 120, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
                    { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    }
];


// Use one or more concatMap, map, and reduce calls to create an array with the following items (order doesn't matter)
// [
//	 {"id": 675465,"title": "Fracture","boxart":"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
//	 {"id": 65432445,"title": "The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
//	 {"id": 654356453,"title": "Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" },
//	 {"id": 70111470,"title": "Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
// ];

listVideo = movieLists.
concatMap(movieList => movieList.videos)
    .concatMap(video => video.boxarts.reduce((smallest, curr) =>
            (curr.width * curr.height < smallest.width * smallest.height) ? curr : smallest)
        .map(boxart => ({ id: video.id, title: video.title, boxart: boxart.url })))
console.log(listVideo);