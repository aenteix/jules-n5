// ALGORITMA SM-2 UNTUK JULES
// Instruksi: Gunakan logika fungsi ini untuk menghitung jadwal review berikutnya.

/**
 * Input yang dibutuhkan dari Database:
 * @param quality: Nilai 0-5 dari user (0=Lupa Total, 3=Ingat Susah Payah, 5=Ingat Sempurna)
 * @param lastInterval: Interval hari dari review sebelumnya (default: 0 untuk kartu baru)
 * @param lastRepetition: Jumlah sukses berturut-turut (default: 0)
 * @param lastEaseFactor: Faktor kemudahan (default: 2.5)
 */

interface ReviewInput {
  quality: number; // 0-5
  lastInterval: number;
  lastRepetition: number;
  lastEaseFactor: number;
}

interface ReviewOutput {
  interval: number;    // Hari sampai review berikutnya
  repetition: number;  // Counter streak baru
  easeFactor: number;  // Multiplier baru
}

export function calculateSM2(input: ReviewInput): ReviewOutput {
  let { quality, lastInterval, lastRepetition, lastEaseFactor } = input;
  let interval: number;
  let repetition: number;
  let easeFactor: number;

  // 1. Jika Quality < 3, artinya user salah/lupa. Reset progress.
  if (quality < 3) {
    repetition = 0;
    interval = 1; // Review lagi besok
    easeFactor = lastEaseFactor; // EF tidak berubah saat gagal
  }
  // 2. Jika Quality >= 3, user ingat. Hitung jadwal berikutnya.
  else {
    repetition = lastRepetition + 1;

    // Rumus Interval (hari)
    if (repetition === 1) {
      interval = 1;
    } else if (repetition === 2) {
      interval = 6;
    } else {
      interval = Math.round(lastInterval * lastEaseFactor);
    }

    // Rumus Ease Factor (EF)
    // EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
    easeFactor = lastEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  }

  // Batas Bawah: Ease Factor tidak boleh kurang dari 1.3
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  return { interval, repetition, easeFactor };
}