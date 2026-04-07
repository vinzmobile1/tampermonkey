// ==UserScript==
// @name         Ads TikTok Table Editor
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Edit table with toggle sidebar and column labels
// @author       TechLead
// @match        https://ads.tiktok.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";

  let originalData = [];

  GM_addStyle(`
        #editor-sidebar {
            position: fixed; right: 0; top: 0; width: 350px; height: 100vh;
            background: #fff; border-left: 2px solid #ccc; z-index: 9999;
            overflow-y: auto; padding: 15px; box-shadow: -2px 0 5px rgba(0,0,0,0.2);
        }
        .floating-toggle {
            position: fixed; right: 20px; bottom: 20px; z-index: 10000;
            padding: 10px 20px; background: #000; color: #fff; border-radius: 5px; cursor: pointer;
        }
        .edit-row { margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #eee; }
        .edit-input { width: 100%; margin-bottom: 10px; padding: 5px; box-sizing: border-box; }
        .input-label { font-size: 12px; color: #666; font-weight: bold; display: block; margin-bottom: 2px; }
        .btn-group { display: flex; gap: 5px; margin-bottom: 10px; }
    `);

  function updateTextNode(element, newText) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent.trim() !== "") {
        node.textContent = newText;
        return;
      }
    }
    element.innerText = newText;
  }

  function toggleSidebar() {
    const sb = document.getElementById("editor-sidebar");
    sb.style.display = sb.style.display === "none" ? "block" : "none";
  }

  function createSidebar() {
    // Floating Toggle Button
    const toggleBtn = document.createElement("div");
    toggleBtn.className = "floating-toggle";
    toggleBtn.innerText = "Toggle Editor";
    toggleBtn.onclick = toggleSidebar;
    document.body.appendChild(toggleBtn);

    // Sidebar
    const sidebar = document.createElement("div");
    sidebar.id = "editor-sidebar";
    sidebar.innerHTML = `
            <h3>Table Editor</h3>
            <div class="btn-group">
                <button id="btn-refresh">Refresh Data</button>
                <button id="btn-restore" style="background: #ff4d4f; color: white; border: none;">Restore All</button>
            </div>
            <div id="editor-content"></div>
        `;
    document.body.appendChild(sidebar);

    document.getElementById("btn-refresh").addEventListener("click", loadTableData);
    document.getElementById("btn-restore").addEventListener("click", restoreData);
  }

  function loadTableData() {
    const content = document.getElementById("editor-content");
    content.innerHTML = "";
    originalData = [];

    // Ambil header untuk label
    const headers = Array.from(document.querySelectorAll("thead .core-table-th-item-title")).map((el) => el.innerText.trim());
    const rows = document.querySelectorAll(".core-table-tr");

    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll(".core-table-cell-wrap-value");
      if (cells.length === 0) return;

      const rowDiv = document.createElement("div");
      rowDiv.className = "edit-row";
      rowDiv.innerHTML = `<strong>Row ${rowIndex + 1}</strong>`;

      cells.forEach((cell, cellIndex) => {
        const initialText = cell.innerText.trim();
        originalData.push({ element: cell, originalText: initialText, inputId: `input-${rowIndex}-${cellIndex}` });

        // Tambahkan Label
        const label = document.createElement("span");
        label.className = "input-label";
        label.innerText = headers[cellIndex] || `Column ${cellIndex + 1}`;
        rowDiv.appendChild(label);

        const input = document.createElement("input");
        input.className = "edit-input";
        input.id = `input-${rowIndex}-${cellIndex}`;
        input.value = initialText;

        input.addEventListener("input", (e) => {
          updateTextNode(cell, e.target.value);
        });

        rowDiv.appendChild(input);
      });
      content.appendChild(rowDiv);
    });
  }

  function restoreData() {
    originalData.forEach((item) => {
      updateTextNode(item.element, item.originalText);
      const input = document.getElementById(item.inputId);
      if (input) input.value = item.originalText;
    });
  }

  setTimeout(createSidebar, 2000);
})();