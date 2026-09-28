function normalizeText(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/^m\.\s*/, '')
    .replace(/^mm\.\s*/, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getLevenshteinDistance(a, b) {
  if (!a) return b ? b.length : 0;
  if (!b) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          )
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

function isFlexibleMatch(userAnswer, targetAnswer) {
  const normUser = normalizeText(userAnswer);
  const normTarget = normalizeText(targetAnswer);

  if (!normUser || !normTarget) return false;

  if (normUser === normTarget) return true;

  if (normUser.length < Math.min(3, Math.floor(normTarget.length * 0.4))) {
    return false;
  }

  if (normUser.length >= Math.floor(normTarget.length * 0.7)) {
    if (normUser.includes(normTarget) || (normTarget.includes(normUser) && normUser.length >= normTarget.length - 3)) {
      return true;
    }
  }

  const distance = getLevenshteinDistance(normUser, normTarget);
  const allowedTypos = normTarget.length >= 12 ? 3 : normTarget.length >= 6 ? 2 : 1;

  if (distance <= allowedTypos) {
    return true;
  }

  return false;
}

const testCases = [
  // Bug 1: Single letter inputs MUST fail for long words
  { user: "A", target: "M. coracobrachialis", expected: false },
  { user: "a", target: "M. latissimus dorsi", expected: false },
  { user: "co", target: "M. coracobrachialis", expected: false },
  
  // Bug 2: Typo tolerance for real user typos MUST pass
  { user: "Lattisimus dorsi", target: "M. latissimus dorsi", expected: true },
  { user: "latisimus dorsi", target: "M. latissimus dorsi", expected: true },
  { user: "Bicepss brachii", target: "M. biceps brachii", expected: true },
  { user: "Pectoralis majr", target: "M. pectoralis major", expected: true },
  { user: "Deltoidus", target: "M. deltoideus", expected: true },

  // Exact & prefix variations MUST pass
  { user: "M. biceps brachii", target: "M. biceps brachii", expected: true },
  { user: "biceps brachii", target: "M. biceps brachii", expected: true },
  { user: "dvojhlavy sval pazni", target: "dvojhlavý sval pažní", expected: true },
  
  // Completely wrong terms MUST fail
  { user: "rectus abdominis", target: "M. biceps brachii", expected: false },
  { user: "trapezius", target: "M. iliopsoas", expected: false }
];

let passed = 0;
let failed = 0;

testCases.forEach((t, i) => {
  const result = isFlexibleMatch(t.user, t.target);
  if (result === t.expected) {
    console.log(`✓ Test ${i + 1} PASSED: "${t.user}" vs "${t.target}" => ${result}`);
    passed++;
  } else {
    console.error(`✕ Test ${i + 1} FAILED: "${t.user}" vs "${t.target}" => got ${result}, expected ${t.expected}`);
    failed++;
  }
});

console.log(`\nAll Results: ${passed} passed, ${failed} failed out of ${testCases.length} total.`);
if (failed > 0) process.exit(1);
