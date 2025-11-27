#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import puppeteer from 'puppeteer';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

// MCP Server for BUGATTI Jekyll site with browser rendering analysis
const siteRoot = path.resolve(path.dirname(import.meta.url), '..');

console.error(`MCP Server started for: ${siteRoot}`);
console.error(`Note: Provide the correct Jekyll URL (e.g., http://localhost:3000 or http://localhost:4000) when calling screenshot_page and other tools`);

let browser = null;

async function launchBrowser() {
  if (!browser) {
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      console.error('Browser launched successfully');
    } catch (error) {
      console.error(`Failed to launch browser: ${error.message}`);
      throw error;
    }
  }
  return browser;
}

// Handle stdin/stdout for MCP protocol
let inputBuffer = '';

process.stdin.setEncoding('utf-8');
process.stdin.on('data', (chunk) => {
  inputBuffer += chunk;
  processMessages();
});

function processMessages() {
  const lines = inputBuffer.split('\n');
  inputBuffer = lines[lines.length - 1];
  
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i].trim();
    if (line) {
      try {
        const message = JSON.parse(line);
        handleMessage(message);
      } catch (e) {
        console.error(`Failed to parse message: ${e.message}`);
      }
    }
  }
}

async function handleMessage(message) {
  const { id, method, params } = message;
  
  try {
    let result;
    
    switch (method) {
      case 'initialize':
        result = {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {
              listTools: true,
              callTool: true
            }
          },
          serverInfo: {
            name: 'BUGATTI MCP Server - Browser Rendering',
            version: '1.0.0'
          }
        };
        sendResponse(id, result);
        break;
        
      case 'tools/list':
        result = {
          tools: [
            {
              name: 'screenshot_page',
              description: 'Take a screenshot of a page',
              inputSchema: {
                type: 'object',
                properties: {
                  url: { type: 'string', description: 'Full URL to screenshot (e.g., http://localhost:4000/bugatti)' },
                  selector: { type: 'string', description: 'Optional CSS selector to focus on' },
                  filename: { type: 'string', description: 'Optional filename to save screenshot' }
                },
                required: ['url']
              }
            },
            {
              name: 'inspect_element',
              description: 'Inspect a DOM element and get its computed styles',
              inputSchema: {
                type: 'object',
                properties: {
                  url: { type: 'string', description: 'Full URL' },
                  selector: { type: 'string', description: 'CSS selector of element to inspect' }
                },
                required: ['url', 'selector']
              }
            },
            {
              name: 'analyze_layout',
              description: 'Analyze layout issues on a page',
              inputSchema: {
                type: 'object',
                properties: {
                  url: { type: 'string', description: 'Full URL to analyze' },
                  width: { type: 'number', description: 'Viewport width (default 1280)' },
                  height: { type: 'number', description: 'Viewport height (default 800)' }
                },
                required: ['url']
              }
            },
            {
              name: 'check_element_visibility',
              description: 'Check if elements are visible and on one line',
              inputSchema: {
                type: 'object',
                properties: {
                  url: { type: 'string', description: 'Full URL' },
                  containerSelector: { type: 'string', description: 'CSS selector for container' },
                  itemSelector: { type: 'string', description: 'CSS selector for items inside container' }
                },
                required: ['url', 'containerSelector', 'itemSelector']
              }
            },
            {
              name: 'read_pdf',
              description: 'Extract text content from a PDF file',
              inputSchema: {
                type: 'object',
                properties: {
                  filepath: { type: 'string', description: 'Path to the PDF file (relative to site root or absolute)' },
                  maxPages: { type: 'number', description: 'Maximum number of pages to extract (default: all)' }
                },
                required: ['filepath']
              }
            }
          ]
        };
        sendResponse(id, result);
        break;
        
      case 'tools/call':
        handleToolCall(id, params);
        break;
        
      default:
        sendError(id, `Unknown method: ${method}`);
    }
  } catch (error) {
    sendError(id, error.message);
  }
}

async function handleToolCall(id, params) {
  const { name, arguments: args } = params;
  
  try {
    let result;
    
    switch (name) {
      case 'screenshot_page': {
        const br = await launchBrowser();
        const page = await br.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto(args.url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        let screenshotPath = args.filename || '/tmp/screenshot.png';
        if (!screenshotPath.startsWith('/')) {
          screenshotPath = path.join(siteRoot, screenshotPath);
        }
        
        if (args.selector) {
          await page.waitForSelector(args.selector);
          const element = await page.$(args.selector);
          await element.screenshot({ path: screenshotPath });
        } else {
          await page.screenshot({ path: screenshotPath, fullPage: true });
        }
        
        await page.close();
        result = { success: true, path: screenshotPath, message: `Screenshot saved to ${screenshotPath}` };
        break;
      }
      
      case 'inspect_element': {
        const br = await launchBrowser();
        const page = await br.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto(args.url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        await page.waitForSelector(args.selector);
        const elementInfo = await page.evaluate((selector) => {
          const elem = document.querySelector(selector);
          if (!elem) return null;
          
          const style = window.getComputedStyle(elem);
          const rect = elem.getBoundingClientRect();
          
          return {
            selector: selector,
            tag: elem.tagName,
            classes: elem.className,
            id: elem.id,
            text: elem.textContent?.substring(0, 100),
            position: {
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height,
              visible: rect.width > 0 && rect.height > 0
            },
            styles: {
              display: style.display,
              position: style.position,
              flexWrap: style.flexWrap,
              whiteSpace: style.whiteSpace,
              width: style.width,
              height: style.height,
              maxWidth: style.maxWidth,
              maxHeight: style.maxHeight,
              gap: style.gap,
              padding: style.padding,
              margin: style.margin,
              overflow: style.overflow,
              flexShrink: style.flexShrink,
              alignItems: style.alignItems,
              justifyContent: style.justifyContent
            }
          };
        }, args.selector);
        
        await page.close();
        result = elementInfo || { error: 'Element not found' };
        break;
      }
      
      case 'analyze_layout': {
        const br = await launchBrowser();
        const page = await br.newPage();
        const width = args.width || 1280;
        const height = args.height || 800;
        await page.setViewport({ width, height });
        await page.goto(args.url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        const layoutInfo = await page.evaluate(() => {
          return {
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            bodyWidth: document.body.offsetWidth,
            bodyHeight: document.body.offsetHeight,
            hasHorizontalScroll: document.body.scrollWidth > window.innerWidth,
            hasVerticalScroll: document.body.scrollHeight > window.innerHeight,
            overflowElements: Array.from(document.querySelectorAll('*'))
              .filter(el => {
                const style = window.getComputedStyle(el);
                return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
              })
              .slice(0, 5)
              .map(el => ({
                tag: el.tagName,
                classes: el.className,
                scrollWidth: el.scrollWidth,
                clientWidth: el.clientWidth,
                scrollHeight: el.scrollHeight,
                clientHeight: el.clientHeight
              }))
          };
        });
        
        await page.close();
        result = layoutInfo;
        break;
      }
      
      case 'check_element_visibility': {
        const br = await launchBrowser();
        const page = await br.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto(args.url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        await page.waitForSelector(args.containerSelector);
        const visibilityInfo = await page.evaluate((containerSel, itemSel) => {
          const container = document.querySelector(containerSel);
          const items = container.querySelectorAll(itemSel);
          
          const itemsData = Array.from(items).map(item => {
            const rect = item.getBoundingClientRect();
            const style = window.getComputedStyle(item);
            return {
              visible: rect.width > 0 && rect.height > 0,
              x: Math.round(rect.x),
              y: Math.round(rect.y),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
              display: style.display,
              flexShrink: style.flexShrink
            };
          });
          
          const containerRect = container.getBoundingClientRect();
          const allOneLine = itemsData.every(item => Math.abs(item.y - itemsData[0].y) < 5);
          
          return {
            container: {
              width: Math.round(containerRect.width),
              height: Math.round(containerRect.height),
              display: window.getComputedStyle(container).display,
              flexWrap: window.getComputedStyle(container).flexWrap,
              whiteSpace: window.getComputedStyle(container).whiteSpace
            },
            itemCount: items.length,
            allOneLine: allOneLine,
            items: itemsData,
            totalWidth: itemsData.reduce((sum, i) => sum + i.width, 0),
            issue: allOneLine ? null : `Items are wrapping. Total width needed: ${itemsData.reduce((sum, i) => sum + i.width, 0)}px, Container width: ${Math.round(containerRect.width)}px`
          };
        }, args.containerSelector, args.itemSelector);
        
        await page.close();
        result = visibilityInfo;
        break;
      }
      
      case 'read_pdf': {
        // Resolve filepath - could be relative to siteRoot or absolute
        let filePath = args.filepath;
        if (!path.isAbsolute(filePath)) {
          filePath = path.join(siteRoot, filePath);
        }
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
          throw new Error(`PDF file not found: ${filePath}`);
        }
        
        // Read PDF
        const dataBuffer = fs.readFileSync(filePath);
        const pdf = await pdfParse(dataBuffer);
        
        // Extract text from all pages or up to maxPages
        const maxPages = args.maxPages || pdf.numpages;
        const pageCount = Math.min(maxPages, pdf.numpages);
        
        const content = {
          filename: path.basename(filePath),
          totalPages: pdf.numpages,
          extractedPages: pageCount,
          text: pdf.text || '',
          metadata: {
            producer: pdf.info?.Producer || 'Unknown',
            creator: pdf.info?.Creator || 'Unknown',
            creationDate: pdf.info?.CreationDate || 'Unknown'
          }
        };
        
        result = content;
        break;
      }
      
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
    
    sendResponse(id, result);
  } catch (error) {
    sendError(id, error.message);
  }
}

function sendResponse(id, result) {
  const response = { jsonrpc: '2.0', id, result };
  console.log(JSON.stringify(response));
}

function sendError(id, message) {
  const response = { jsonrpc: '2.0', id, error: { code: -1, message } };
  console.log(JSON.stringify(response));
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  if (browser) {
    await browser.close();
  }
  process.exit(0);
});

