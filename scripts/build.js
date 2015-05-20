var fs = require('fs');
var path = require('path');

var _ = require('lodash');
var moment = require('moment-timezone');
var hson = require('hanson');
var jade = require('jade');

compileIndex();


function compileIndex() {
  var indexFilename = here('../index.jade');
  var index = fs.readFileSync(indexFilename, 'utf-8');
  var locals = getDataFromHson('./locals.hson');
  alterLocals(locals);
  locals = _.merge(locals, getEpisodeLocals());
  var fn = jade.compile(index, {pretty: true, filename: indexFilename});
  var result = fn(locals);
  fs.writeFileSync(here('../dist/index.html'), result);
}


function alterLocals(locals) {
  _.each(locals.panelists, function(panelist) {
    panelist.avatar = panelist.avatar || 'panel/' + panelist.twitter + '.png';
  });
  locals.panelists = smartChunk(locals.panelists);
  return locals;
}

function getEpisodeLocals() {
  var episodeRelative = '../episodes';
  var episodeDirectories = getDirectories(here(episodeRelative));
  var episodes = [];
  var pastEpisodes = [];

  _.each(episodeDirectories, function(date) {
    var episodeData = getDataFromHson(here(episodeRelative + '/' + date + '/data.hson'));
    if (!_.isEmpty(episodeData)) {
      episodeData = modifyEpisodeData(episodeData, date);
      if (isPast(episodeData.dateTime)) {
        pastEpisodes.push(episodeData);
      } else {
        episodes.push(episodeData);
      }
    }
  });

  return {
    episodes: episodes,
    pastEpisodes: pastEpisodes
  };


  function modifyEpisodeData(episode, date) {
    episode.dateTime = _.isUndefined(episode.dateTime) ? date + ' 11:00' : episode.dateTime;
    if (episode.dateTime) {
      episode.dateTime = moment.tz(episode.dateTime, episode.timezone || 'America/Los_Angeles');
      if (!episode.displayDate) {
        episode.displayDate = episode.dateTime.format('dddd, MMM Do, YYYY [at] h:mm A [(]z[)]');
      }
    } else {
      episode.displayDate = '(Date and Time TBA)';
    }

    episode.guests = smartChunk(episode.guests);

    return episode;
  }
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function getDataFromHson(path) {
  var absolutePath = here(path);
  var exists = fs.existsSync(absolutePath);
  if (exists) {
    var hsonString = fs.readFileSync(absolutePath, 'utf-8');
    if (hsonString) {
      return hson.parse(hsonString);
    }
  }
  return {};
}


function isFuture(date) {
  return moment().diff(date) < 0;
}

function isPast(date) {
  return !isFuture(date);
}

function smartChunk(array) {
  if (_.isEmpty(array)) {
    return [];
  }
  var chunk = 4;
  if (array.length === 5 || array.length === 6) {
    chunk = 3;
  }
  return _.chunk(array, chunk);
}

function here(dest) {
  return path.resolve(__dirname, dest);
}
