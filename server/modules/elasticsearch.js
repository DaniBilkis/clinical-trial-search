var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
  host: '34.215.95.31:9200',
  log: 'info'
});

var indexName = "randomindex";

/**
 * Delete an existing index
 */
function deleteIndex() {
  return elasticClient.indices.delete({
    index: indexName
  });
}
exports.deleteIndex = deleteIndex;

/**
 * create the index
 */
function initIndex() {
  return elasticClient.indices.create({
    index: indexName
  });
}
exports.initIndex = initIndex;

/**
 * check if the index exists
 */
function indexExists() {
  return elasticClient.indices.exists({
    index: indexName
  });
}
exports.indexExists = indexExists;

function getSuggestions(input) {
  return elasticClient.suggest({
    index: indexName,
    type: "document",
    body: {
      docsuggest: {
        text: input,
        completion: {
          field: "suggest",
          fuzzy: true
        }
      }
    }
  })
}
exports.getSuggestions = getSuggestions;

function getCountOfDocuments() {
  return elasticClient.count;
}
exports.getCountOfDocuments = getCountOfDocuments();


function pingElastic() {
  elasticClient.ping({
    requestTimeout: 30000,
  }, function(error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('Everything is ok');
    }
  });
}
exports.pingElastic = pingElastic();
