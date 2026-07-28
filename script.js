const templateRows = [
  { name: "", category: "cosmetics", price: "", weight: "", quantity: "" },
  { name: "", category: "cosmetics", price: "", weight: "", quantity: "" },
];

const state = {
  scenarios: [],
  language: "zh",
};

const taxRules = {
  cosmeticsThreshold: 10,
  maskpackThreshold: 15,
  lowRate: 0.091,
  highRate: 0.2305,
};

const scenarioList = document.querySelector("#scenarioList");
const compareRows = document.querySelector("#compareRows");
const scenarioCount = document.querySelector("#scenarioCount");
const scenarioTemplate = document.querySelector("#scenarioTemplate");
const rowTemplate = document.querySelector("#rowTemplate");
const languageToggle = document.querySelector("#languageToggle");

const i18n = {
  zh: {
    title: "组合装税费测算工具",
    languageLabel: "语言 / Language",
    languageAria: "切换语言",
    addScenario: "新建组合装",
    copyResults: "复制结果",
    copied: "已复制",
    exportCsv: "导出 CSV",
    exportExcel: "导出 Excel",
    reset: "重置",
    taxReference: ["税率规则参考", "固定规则，不需要填写"],
    cosmeticsRule: ["化妆品", "单位容量售价 ≥ 10：23.05%"],
    maskpackRule: ["面膜", "单位容量售价 ≥ 15：23.05%"],
    otherRule: ["其他 / 未达阈值", "9.10%"],
    scenarioSection: "组合装方案",
    scenarioCount: (count) => `${count} 个方案`,
    comparisonTitle: "组合方案对比",
    comparisonNote: "所有组合装放在同一页，底部这里做快速汇总",
    comparisonHeaders: ["组合名称", "商品数", "组合实际售价", "原售价合计", "结算税金合计", "综合税率"],
    scenarioName: "组合名称",
    duplicateScenario: "复制此组合",
    deleteScenario: "删除组合",
    bundlePrice: "组合装实际售价",
    requiredPlaceholder: "很重要，必填！",
    totalListPrice: "原售价合计",
    totalTax: "税金合计",
    productDetails: "当前组合商品明细",
    addProduct: "添加商品",
    productHeaders: [
      "产品名",
      "产品类型",
      "单件售价",
      "单件克重(g)",
      "数量",
      "售价合计",
      "占比",
      "实际结算售价",
      "合计克重(g)",
      "单位容量售价",
      "结算税率",
      "结算税金",
      "",
    ],
    productPlaceholder: "例如：产品 A",
    categories: { cosmetics: "化妆品", maskpack: "面膜", other: "其他" },
    removeRow: "删除本行",
    unnamedScenario: "未命名组合",
    scenarioPrefix: "组合",
    copySuffix: "复制",
    summarySuffix: "汇总",
    exportFile: "组合装税费测算结果.csv",
    excelFile: "组合装税费测算结果.xlsx",
    excelSheetName: "组合装税费测算",
    excelTitle: "组合装税费测算结果",
    exportHeaders: [
      "组合名称",
      "产品名",
      "产品类型",
      "单件产品售价",
      "单件产品克重(g)",
      "产品数量",
      "产品售价合计",
      "产品售价所占比例",
      "实际结算售价",
      "产品合计克重(g)",
      "单位容量售价",
      "结算税率",
      "结算税金",
    ],
  },
  ko: {
    title: "세트상품 세금 계산 도구",
    languageLabel: "언어 / Language",
    languageAria: "언어 전환",
    addScenario: "세트 추가",
    copyResults: "결과 복사",
    copied: "복사 완료",
    exportCsv: "CSV 내보내기",
    exportExcel: "Excel 내보내기",
    reset: "초기화",
    taxReference: ["세율 기준", "고정 기준, 입력 불필요"],
    cosmeticsRule: ["화장품", "단위 용량 판매가 ≥ 10: 23.05%"],
    maskpackRule: ["마스크팩", "단위 용량 판매가 ≥ 15: 23.05%"],
    otherRule: ["기타 / 기준 미만", "9.10%"],
    scenarioSection: "세트상품 안",
    scenarioCount: (count) => `${count}개 안`,
    comparisonTitle: "세트상품 안 비교",
    comparisonNote: "모든 세트상품 안은 한 페이지에 표시되며, 아래에서 빠르게 합산됩니다",
    comparisonHeaders: ["세트명", "상품 수", "세트 실제 판매가", "원 판매가 합계", "정산 세금 합계", "종합 세율"],
    scenarioName: "세트명",
    duplicateScenario: "이 세트 복사",
    deleteScenario: "세트 삭제",
    bundlePrice: "세트 실제 판매가",
    requiredPlaceholder: "매우 중요, 필수 입력!",
    totalListPrice: "원 판매가 합계",
    totalTax: "세금 합계",
    productDetails: "현재 세트 상품 상세",
    addProduct: "상품 추가",
    productHeaders: [
      "상품명",
      "상품 유형",
      "단품 판매가",
      "단품 중량(g)",
      "수량",
      "판매가 합계",
      "비중",
      "실제 정산 판매가",
      "총 중량(g)",
      "단위 용량 판매가",
      "정산 세율",
      "정산 세금",
      "",
    ],
    productPlaceholder: "예: 상품 A",
    categories: { cosmetics: "화장품", maskpack: "마스크팩", other: "기타" },
    removeRow: "이 행 삭제",
    unnamedScenario: "이름 없는 세트",
    scenarioPrefix: "세트",
    copySuffix: "복사",
    summarySuffix: "합계",
    exportFile: "세트상품_세금_계산_결과.csv",
    excelFile: "세트상품_세금_계산_결과.xlsx",
    excelSheetName: "세트상품 세금 계산",
    excelTitle: "세트상품 세금 계산 결과",
    exportHeaders: [
      "세트명",
      "상품명",
      "상품 유형",
      "단품 판매가",
      "단품 중량(g)",
      "상품 수량",
      "상품 판매가 합계",
      "상품 판매가 비중",
      "실제 정산 판매가",
      "상품 총 중량(g)",
      "단위 용량 판매가",
      "정산 세율",
      "정산 세금",
    ],
  },
};

function t() {
  return i18n[state.language];
}

function buttonHtml(icon, text) {
  return `<span>${icon}</span> ${text}`;
}

function renderLanguageSwitch() {
  languageToggle.setAttribute("aria-label", t().languageAria);
  languageToggle.innerHTML = `
    <span class="language-switch-label">${t().languageLabel}</span>
    <span class="language-options">
      <span class="${state.language === "zh" ? "is-active" : ""}" data-lang-option="zh">中文</span>
      <span class="${state.language === "ko" ? "is-active" : ""}" data-lang-option="ko">한국어</span>
    </span>
  `;
}

function numberValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function money(value) {
  const locale = state.language === "ko" ? "ko-KR" : "zh-CN";
  return numberValue(value).toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function percent(value) {
  return `${(numberValue(value) * 100).toFixed(2)}%`;
}

function createId() {
  return `scenario-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cloneRows(rows) {
  return rows.map((row) => ({ ...row }));
}

function createScenario(name, rows = templateRows) {
  return {
    id: createId(),
    name,
    bundlePrice: "",
    rows: cloneRows(rows),
  };
}

function scenarioMetrics(scenario) {
  const hasBundlePrice = String(scenario.bundlePrice ?? "").trim() !== "";
  const bundlePrice = numberValue(scenario.bundlePrice);
  const rows = scenario.rows.map((item) => ({
    ...item,
    category: item.category || "cosmetics",
    price: numberValue(item.price),
    weight: numberValue(item.weight),
    quantity: numberValue(item.quantity),
  }));
  const totalListPrice = rows.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let totalSettlement = 0;
  let totalWeight = 0;
  let totalTax = 0;

  const lines = rows.map((item) => {
    const linePrice = item.price * item.quantity;
    const share = totalListPrice > 0 ? linePrice / totalListPrice : 0;
    const settlement = hasBundlePrice ? bundlePrice * share : 0;
    const lineWeight = item.weight * item.quantity;
    const rateBaseAmount = hasBundlePrice ? settlement : linePrice;
    const unitPrice = lineWeight > 0 ? rateBaseAmount / lineWeight : 0;
    const taxRate = taxRateForCategory(item.category, unitPrice, {
      cosmeticsThreshold: taxRules.cosmeticsThreshold,
      maskpackThreshold: taxRules.maskpackThreshold,
      lowRate: taxRules.lowRate,
      highRate: taxRules.highRate,
    });
    const tax = settlement * taxRate;

    totalSettlement += settlement;
    totalWeight += lineWeight;
    totalTax += tax;

    return { ...item, linePrice, share, settlement, lineWeight, unitPrice, taxRate, tax };
  });

  return {
    lines,
    totalListPrice,
    totalSettlement,
    totalWeight,
    totalTax,
    effectiveRate: totalSettlement > 0 ? totalTax / totalSettlement : 0,
  };
}

function taxRateForCategory(category, unitAmount, config) {
  if (category === "cosmetics") {
    return unitAmount < config.cosmeticsThreshold ? config.lowRate : config.highRate;
  }
  if (category === "maskpack") {
    return unitAmount < config.maskpackThreshold ? config.lowRate : config.highRate;
  }
  return config.lowRate;
}

function categoryLabel(value) {
  return t().categories[value] || t().categories.cosmetics;
}

function scenarioFromCard(card) {
  return {
    id: card.dataset.id,
    name: card.querySelector('[data-scenario-field="name"]').value.trim() || t().unnamedScenario,
    bundlePrice: card.querySelector('[data-scenario-field="bundlePrice"]').value,
    rows: [...card.querySelectorAll('[data-role="productRows"] tr')].map((row) => ({
      name: row.querySelector('[data-field="name"]').value.trim(),
      category: row.querySelector('[data-field="category"]').value,
      price: row.querySelector('[data-field="price"]').value,
      weight: row.querySelector('[data-field="weight"]').value,
      quantity: row.querySelector('[data-field="quantity"]').value,
    })),
  };
}

function syncStateFromDom() {
  state.scenarios = [...scenarioList.querySelectorAll(".scenario-card")].map(scenarioFromCard);
}

function setOutput(row, key, value, className = "") {
  const cell = row.querySelector(`[data-output="${key}"]`);
  cell.textContent = value;
  cell.className = className;
}

function renderRow(tbody, data = {}) {
  const row = rowTemplate.content.firstElementChild.cloneNode(true);
  row.querySelector('[data-field="name"]').value = data.name ?? "";
  row.querySelector('[data-field="category"]').value = data.category ?? "cosmetics";
  row.querySelector('[data-field="price"]').value = data.price ?? "";
  row.querySelector('[data-field="weight"]').value = data.weight ?? "";
  row.querySelector('[data-field="quantity"]').value = data.quantity ?? "";
  tbody.append(row);
}

function renderScenarioCard(scenario) {
  const card = scenarioTemplate.content.firstElementChild.cloneNode(true);
  card.dataset.id = scenario.id;
  card.querySelector('[data-scenario-field="name"]').value = scenario.name;
  card.querySelector('[data-scenario-field="bundlePrice"]').value = scenario.bundlePrice;

  const tbody = card.querySelector('[data-role="productRows"]');
  scenario.rows.forEach((row) => renderRow(tbody, row));
  scenarioList.append(card);
  applyCardLanguage(card);
  calculateCard(card);
}

function calculateCard(card) {
  const scenario = scenarioFromCard(card);
  const metrics = scenarioMetrics(scenario);
  const rows = [...card.querySelectorAll('[data-role="productRows"] tr')];

  rows.forEach((row, index) => {
    const line = metrics.lines[index];
    const rateClass = line.taxRate === taxRules.highRate ? "rate-high" : "rate-low";
    setOutput(row, "linePrice", money(line.linePrice));
    setOutput(row, "share", percent(line.share));
    setOutput(row, "settlement", money(line.settlement));
    setOutput(row, "lineWeight", money(line.lineWeight));
    setOutput(row, "unitPrice", money(line.unitPrice));
    setOutput(row, "taxRate", percent(line.taxRate), rateClass);
    setOutput(row, "tax", money(line.tax));
  });

  card.querySelector('[data-output="totalListPrice"]').textContent = money(metrics.totalListPrice);
  card.querySelector('[data-output="totalTax"]').textContent = money(metrics.totalTax);
}

function calculateAll() {
  [...scenarioList.querySelectorAll(".scenario-card")].forEach(calculateCard);
  syncStateFromDom();
  renderComparison();
  scenarioCount.textContent = t().scenarioCount(state.scenarios.length);
}

function renderComparison() {
  compareRows.innerHTML = "";
  state.scenarios.forEach((scenario) => {
    const metrics = scenarioMetrics(scenario);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${scenario.name || t().unnamedScenario}</td>
      <td>${scenario.rows.length}</td>
      <td>${money(scenario.bundlePrice)}</td>
      <td>${money(metrics.totalListPrice)}</td>
      <td>${money(metrics.totalTax)}</td>
      <td>${percent(metrics.effectiveRate)}</td>
    `;
    compareRows.append(row);
  });
}

function addScenario(baseScenario) {
  syncStateFromDom();
  const scenario =
    baseScenario ||
    createScenario(`${t().scenarioPrefix} ${state.scenarios.length + 1}`, [
      { name: "", category: "cosmetics", price: "", weight: "", quantity: 1 },
    ]);
  state.scenarios.push(scenario);
  renderScenarioCard(scenario);
  calculateAll();
}

function duplicateScenario(card) {
  const scenario = scenarioFromCard(card);
  const copy = {
    ...scenario,
    id: createId(),
    name: `${scenario.name || t().unnamedScenario} - ${t().copySuffix}`,
    rows: cloneRows(scenario.rows),
  };
  addScenario(copy);
}

function deleteScenario(card) {
  if (scenarioList.querySelectorAll(".scenario-card").length <= 1) return;
  card.remove();
  calculateAll();
}

function addProductRow(card) {
  const tbody = card.querySelector('[data-role="productRows"]');
  renderRow(tbody, { category: "cosmetics", quantity: 1 });
  calculateAll();
}

function tableRowsForExport() {
  const headers = t().exportHeaders;

  const rows = [];
  state.scenarios.forEach((scenario) => {
    const metrics = scenarioMetrics(scenario);
    metrics.lines.forEach((line) => {
      rows.push([
        scenario.name,
        line.name,
        categoryLabel(line.category),
        line.price,
        line.weight,
        line.quantity,
        money(line.linePrice),
        percent(line.share),
        money(line.settlement),
        money(line.lineWeight),
        money(line.unitPrice),
        percent(line.taxRate),
        money(line.tax),
      ]);
    });
    rows.push([
      `${scenario.name} ${t().summarySuffix}`,
      "",
      "",
      "",
      "",
      "",
      money(metrics.totalListPrice),
      "",
      money(metrics.totalSettlement),
      money(metrics.totalWeight),
      "",
      percent(metrics.effectiveRate),
      money(metrics.totalTax),
    ]);
  });

  return [headers, ...rows];
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function exportCsv() {
  calculateAll();
  const csv = tableRowsForExport().map((row) => row.map(csvEscape).join(",")).join("\n");
  const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = t().exportFile;
  link.click();
  URL.revokeObjectURL(url);
}

function xmlEscape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formulaEscape(value) {
  return String(value ?? "").replace(/"/g, '""');
}

function columnName(index) {
  let name = "";
  let current = index;
  while (current > 0) {
    const remainder = (current - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    current = Math.floor((current - 1) / 26);
  }
  return name;
}

function makeCell(rowIndex, columnIndex, cell = {}) {
  const ref = `${columnName(columnIndex)}${rowIndex}`;
  const style = cell.style ? ` s="${cell.style}"` : "";
  if (cell.formula) {
    return `<c r="${ref}"${style}><f>${xmlEscape(cell.formula)}</f></c>`;
  }
  if (cell.value === "" || cell.value == null) {
    return "";
  }
  if (cell.type === "number") {
    return `<c r="${ref}"${style}><v>${numberValue(cell.value)}</v></c>`;
  }
  return `<c r="${ref}" t="inlineStr"${style}><is><t>${xmlEscape(cell.value)}</t></is></c>`;
}

function makeRow(rowIndex, cells) {
  const body = cells.map((cell, index) => makeCell(rowIndex, index + 1, cell)).join("");
  return `<row r="${rowIndex}">${body}</row>`;
}

function excelRowsForExport() {
  syncStateFromDom();
  const headers = [
    t().exportHeaders[0],
    t().exportHeaders[1],
    t().exportHeaders[2],
    t().exportHeaders[3],
    t().exportHeaders[4],
    t().exportHeaders[5],
    t().bundlePrice,
    t().exportHeaders[6],
    t().exportHeaders[7],
    t().exportHeaders[8],
    t().exportHeaders[9],
    t().exportHeaders[10],
    t().exportHeaders[11],
    t().exportHeaders[12],
  ];
  const rows = [
    [{ value: t().excelTitle, style: 1 }],
    [],
    headers.map((value) => ({ value, style: 1 })),
  ];

  state.scenarios.forEach((scenario) => {
    const scenarioName = scenario.name || t().unnamedScenario;
    const bundlePrice = String(scenario.bundlePrice ?? "").trim();
    const firstRow = rows.length + 1;
    scenario.rows.forEach((item) => {
      const rowIndex = rows.length + 1;
      rows.push([
        { value: scenarioName },
        { value: item.name },
        { value: categoryLabel(item.category) },
        { value: item.price, type: "number", style: 2 },
        { value: item.weight, type: "number", style: 2 },
        { value: item.quantity, type: "number", style: 2 },
        { value: bundlePrice, type: "number", style: 2 },
        { formula: `D${rowIndex}*F${rowIndex}`, style: 2 },
        { formula: `IF(SUM($H$${firstRow}:$H$${firstRow + scenario.rows.length - 1})>0,H${rowIndex}/SUM($H$${firstRow}:$H$${firstRow + scenario.rows.length - 1}),0)`, style: 3 },
        { formula: `G${rowIndex}*I${rowIndex}`, style: 2 },
        { formula: `E${rowIndex}*F${rowIndex}`, style: 2 },
        { formula: `IF(K${rowIndex}>0,IF(G${rowIndex}="",H${rowIndex}/K${rowIndex},J${rowIndex}/K${rowIndex}),0)`, style: 2 },
        {
          formula: `IF(C${rowIndex}="${formulaEscape(t().categories.cosmetics)}",IF(L${rowIndex}<${taxRules.cosmeticsThreshold},${taxRules.lowRate},${taxRules.highRate}),IF(C${rowIndex}="${formulaEscape(t().categories.maskpack)}",IF(L${rowIndex}<${taxRules.maskpackThreshold},${taxRules.lowRate},${taxRules.highRate}),${taxRules.lowRate}))`,
          style: 3,
        },
        { formula: `J${rowIndex}*M${rowIndex}`, style: 2 },
      ]);
    });

    const summaryRow = rows.length + 1;
    const lastRow = summaryRow - 1;
    rows.push([
      { value: `${scenarioName} ${t().summarySuffix}`, style: 1 },
      {},
      {},
      {},
      {},
      {},
      { value: bundlePrice, type: "number", style: 2 },
      { formula: `SUM(H${firstRow}:H${lastRow})`, style: 2 },
      {},
      { formula: `SUM(J${firstRow}:J${lastRow})`, style: 2 },
      { formula: `SUM(K${firstRow}:K${lastRow})`, style: 2 },
      {},
      { formula: `IF(J${summaryRow}>0,N${summaryRow}/J${summaryRow},0)`, style: 3 },
      { formula: `SUM(N${firstRow}:N${lastRow})`, style: 2 },
    ]);
    rows.push([]);
  });

  return rows;
}

function makeWorksheetXml(rows) {
  const sheetRows = rows.map((row, index) => makeRow(index + 1, row)).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <cols>
    <col min="1" max="1" width="18" customWidth="1"/>
    <col min="2" max="2" width="26" customWidth="1"/>
    <col min="3" max="3" width="14" customWidth="1"/>
    <col min="4" max="14" width="15" customWidth="1"/>
  </cols>
  <sheetData>${sheetRows}</sheetData>
</worksheet>`;
}

const crcTable = (() => {
  const table = [];
  for (let index = 0; index < 256; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    table[index] = value >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function writeUint16(target, offset, value) {
  target[offset] = value & 0xff;
  target[offset + 1] = (value >>> 8) & 0xff;
}

function writeUint32(target, offset, value) {
  target[offset] = value & 0xff;
  target[offset + 1] = (value >>> 8) & 0xff;
  target[offset + 2] = (value >>> 16) & 0xff;
  target[offset + 3] = (value >>> 24) & 0xff;
}

function makeZip(files) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  files.forEach((file) => {
    const nameBytes = encoder.encode(file.name);
    const data = encoder.encode(file.content);
    const crc = crc32(data);
    const local = new Uint8Array(30 + nameBytes.length + data.length);
    writeUint32(local, 0, 0x04034b50);
    writeUint16(local, 4, 20);
    writeUint16(local, 6, 0x0800);
    writeUint16(local, 8, 0);
    writeUint32(local, 14, crc);
    writeUint32(local, 18, data.length);
    writeUint32(local, 22, data.length);
    writeUint16(local, 26, nameBytes.length);
    local.set(nameBytes, 30);
    local.set(data, 30 + nameBytes.length);
    localParts.push(local);

    const central = new Uint8Array(46 + nameBytes.length);
    writeUint32(central, 0, 0x02014b50);
    writeUint16(central, 4, 20);
    writeUint16(central, 6, 20);
    writeUint16(central, 8, 0x0800);
    writeUint16(central, 10, 0);
    writeUint32(central, 16, crc);
    writeUint32(central, 20, data.length);
    writeUint32(central, 24, data.length);
    writeUint16(central, 28, nameBytes.length);
    writeUint32(central, 42, offset);
    central.set(nameBytes, 46);
    centralParts.push(central);
    offset += local.length;
  });

  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const end = new Uint8Array(22);
  writeUint32(end, 0, 0x06054b50);
  writeUint16(end, 8, files.length);
  writeUint16(end, 10, files.length);
  writeUint32(end, 12, centralSize);
  writeUint32(end, 16, offset);
  return new Blob([...localParts, ...centralParts, end], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}

function makeExcelBlob() {
  const sheetXml = makeWorksheetXml(excelRowsForExport());
  return makeZip([
    {
      name: "[Content_Types].xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`,
    },
    {
      name: "_rels/.rels",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`,
    },
    {
      name: "xl/workbook.xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="${xmlEscape(t().excelSheetName)}" sheetId="1" r:id="rId1"/></sheets>
  <calcPr calcMode="auto"/>
</workbook>`,
    },
    {
      name: "xl/_rels/workbook.xml.rels",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`,
    },
    {
      name: "xl/styles.xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <numFmts count="2">
    <numFmt numFmtId="164" formatCode="0.00"/>
    <numFmt numFmtId="165" formatCode="0.00%"/>
  </numFmts>
  <fonts count="2"><font/><font><b/></font></fonts>
  <fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>
  <borders count="1"><border/></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="4">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>
    <xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
    <xf numFmtId="165" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`,
    },
    { name: "xl/worksheets/sheet1.xml", content: sheetXml },
  ]);
}

function exportExcel() {
  calculateAll();
  const blob = makeExcelBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = t().excelFile;
  link.click();
  URL.revokeObjectURL(url);
}

async function copyResults() {
  calculateAll();
  const text = tableRowsForExport().map((row) => row.join("\t")).join("\n");
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.append(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  const button = document.querySelector("#copyBtn");
  const original = button.innerHTML;
  button.innerHTML = buttonHtml("✓", t().copied);
  setTimeout(() => {
    button.innerHTML = original;
  }, 1200);
}

function resetAll() {
  scenarioList.innerHTML = "";
  state.scenarios = [];
  addScenario(createScenario(`${t().scenarioPrefix} 1`, templateRows));
}

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
}

function applyTaxReferenceLanguage() {
  const cards = [...document.querySelectorAll(".tax-reference div")];
  const groups = [t().taxReference, t().cosmeticsRule, t().maskpackRule, t().otherRule];
  cards.forEach((card, index) => {
    const [label, value] = groups[index];
    card.querySelector("span").textContent = label;
    card.querySelector("strong").textContent = value;
  });
}

function applyTableHeaders(table, headers) {
  table.querySelectorAll("thead th").forEach((th, index) => {
    th.textContent = headers[index] || "";
  });
}

function applyRowLanguage(row) {
  row.querySelector('[data-field="name"]').placeholder = t().productPlaceholder;
  const select = row.querySelector('[data-field="category"]');
  select.setAttribute("aria-label", t().productHeaders[1]);
  select.querySelector('[value="cosmetics"]').textContent = t().categories.cosmetics;
  select.querySelector('[value="maskpack"]').textContent = t().categories.maskpack;
  select.querySelector('[value="other"]').textContent = t().categories.other;
  row.querySelector('[data-action="removeRow"]').title = t().removeRow;
}

function applyCardLanguage(card) {
  card.querySelector(".scenario-name span").textContent = t().scenarioName;
  card.querySelector('[data-action="duplicateScenario"]').innerHTML = buttonHtml("⧉", t().duplicateScenario);
  card.querySelector('[data-action="deleteScenario"]').innerHTML = buttonHtml("×", t().deleteScenario);
  card.querySelector(".summary-price span").textContent = t().bundlePrice;
  card.querySelector('[data-scenario-field="bundlePrice"]').placeholder = t().requiredPlaceholder;
  card.querySelector('[data-output="totalListPrice"]').previousElementSibling.textContent = t().totalListPrice;
  card.querySelector('[data-output="totalTax"]').previousElementSibling.textContent = t().totalTax;
  card.querySelector(".table-panel .panel-title strong").textContent = t().productDetails;
  card.querySelector('[data-action="addRow"]').innerHTML = buttonHtml("+", t().addProduct);
  applyTableHeaders(card.querySelector(".table-panel table"), t().productHeaders);
  card.querySelectorAll('[data-role="productRows"] tr').forEach(applyRowLanguage);
}

function applyLanguage() {
  document.documentElement.lang = state.language === "ko" ? "ko-KR" : "zh-CN";
  document.title = t().title;
  setText("h1", t().title);
  renderLanguageSwitch();
  document.querySelector("#addScenarioBtn").innerHTML = buttonHtml("+", t().addScenario);
  document.querySelector("#copyBtn").innerHTML = buttonHtml("□", t().copyResults);
  document.querySelector("#exportBtn").innerHTML = buttonHtml("↓", t().exportCsv);
  document.querySelector("#exportExcelBtn").innerHTML = buttonHtml("⇩", t().exportExcel);
  document.querySelector("#resetBtn").innerHTML = buttonHtml("↺", t().reset);
  applyTaxReferenceLanguage();
  setText(".section-label", t().scenarioSection);
  setText(".compare-panel .panel-title strong", t().comparisonTitle);
  setText(".compare-panel .panel-title span", t().comparisonNote);
  applyTableHeaders(document.querySelector(".compare-table"), t().comparisonHeaders);
  scenarioList.querySelectorAll(".scenario-card").forEach(applyCardLanguage);
  calculateAll();
}

function translateDefaultScenarioNames(fromLanguage, toLanguage) {
  const fromPrefix = i18n[fromLanguage].scenarioPrefix;
  const toPrefix = i18n[toLanguage].scenarioPrefix;
  scenarioList.querySelectorAll('[data-scenario-field="name"]').forEach((input) => {
    const match = input.value.trim().match(new RegExp(`^${fromPrefix} (\\d+)$`));
    if (match) input.value = `${toPrefix} ${match[1]}`;
  });
}

document.querySelector("#addScenarioBtn").addEventListener("click", () => addScenario());
document.querySelector("#exportBtn").addEventListener("click", exportCsv);
document.querySelector("#exportExcelBtn").addEventListener("click", exportExcel);
document.querySelector("#copyBtn").addEventListener("click", copyResults);
document.querySelector("#resetBtn").addEventListener("click", resetAll);
languageToggle.addEventListener("click", () => {
  const previousLanguage = state.language;
  state.language = state.language === "zh" ? "ko" : "zh";
  translateDefaultScenarioNames(previousLanguage, state.language);
  applyLanguage();
});

scenarioList.addEventListener("input", calculateAll);
scenarioList.addEventListener("change", calculateAll);
scenarioList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const card = button.closest(".scenario-card");
  const action = button.dataset.action;

  if (action === "addRow") addProductRow(card);
  if (action === "duplicateScenario") duplicateScenario(card);
  if (action === "deleteScenario") deleteScenario(card);
  if (action === "removeRow") {
    const tbody = card.querySelector('[data-role="productRows"]');
    button.closest("tr").remove();
    if (!tbody.children.length) renderRow(tbody, { category: "cosmetics", quantity: 1 });
    calculateAll();
  }
});

resetAll();
applyLanguage();
