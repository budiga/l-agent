import "dotenv/config"
import "cheerio"
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"

const cheerioLoader = new CheerioWebBaseLoader("https://juejin.cn/post/7233327509919547452", {
  selector: ".main-area p",
})

const documents = await cheerioLoader.load()

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 400, // 每个文本块的最大长度
  chunkOverlap: 20, // 文本块之间的重叠长度
  separators: ["。", "！", "？"], // 分割文本的分隔符
})
const splitChunks = await textSplitter.splitDocuments(documents)
console.log(splitChunks)
