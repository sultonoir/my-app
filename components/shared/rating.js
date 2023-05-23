const ratings = [
  { id: 1, rating: 5, comment: "sangat bagus" },
  { id: 2, rating: 5, comment: "sangat bagus" },
  { id: 2, rating: 5, comment: "sangat bagus" },
  { id: 2, rating: 2, comment: "sangat bagus" },
];

function hitungRataRataRating(ratings) {
  let totalRating = 0;
  let jumlahData = 0;

  for (let i = 0; i < ratings.length; i++) {
    totalRating += ratings[i].rating;
    jumlahData++;
  }

  const rataRata = totalRating / jumlahData;
  return rataRata;
}

const rataRataRating = hitungRataRataRating(ratings);
console.log("Rata-rata rating:", rataRataRating);
