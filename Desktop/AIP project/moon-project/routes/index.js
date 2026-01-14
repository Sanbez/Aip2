var express = require('express');
var router = express.Router();
var SunCalc = require('suncalc3');
var Observation = require('../models/Observation');

// Функция для определения фазы луны на русском
function getMoonPhaseName(phase) {
  if (phase < 0.125) return 'Новолуние';
  if (phase < 0.25) return 'Молодая луна';
  if (phase < 0.375) return 'Первая четверть';
  if (phase < 0.5) return 'Прибывающая луна';
  if (phase < 0.625) return 'Полнолуние';
  if (phase < 0.75) return 'Убывающая луна';
  if (phase < 0.875) return 'Последняя четверть';
  return 'Старая луна';
}

/* Главная страница */
router.get('/', function(req, res, next) {
  var moonIllumination = SunCalc.getMoonIllumination(new Date());
  var phaseName = getMoonPhaseName(moonIllumination.phase);

  res.render('index', {
    title: 'LUNA - Главная',
    phase: moonIllumination.phase,
    phaseName: phaseName,
    illumination: (moonIllumination.fraction * 100).toFixed(1)
  });
});

/* Страница фаз луны */
router.get('/phases', function(req, res, next) {
  var phases = [
    {
      name: 'Новолуние',
      description: 'Луна находится между Землей и Солнцем. Не видна с Земли.',
      phase: 0,
      image: 'new-moon.png'
    },
    {
      name: 'Молодая луна',
      description: 'Тонкий серп луны появляется на западном небе после захода солнца.',
      phase: 0.125,
      image: 'waxing-crescent.png'
    },
    {
      name: 'Первая четверть',
      description: 'Половина луны освещена. Видна во второй половине дня и первой половине ночи.',
      phase: 0.25,
      image: 'first-quarter.png'
    },
    {
      name: 'Прибывающая луна',
      description: 'Более половины луны освещено. Продолжает расти.',
      phase: 0.375,
      image: 'waxing-gibbous.png'
    },
    {
      name: 'Полнолуние',
      description: 'Луна полностью освещена. Восходит на закате и заходит на рассвете.',
      phase: 0.5,
      image: 'full-moon.png'
    },
    {
      name: 'Убывающая луна',
      description: 'Более половины луны освещено, но начинает убывать.',
      phase: 0.625,
      image: 'waning-gibbous.png'
    },
    {
      name: 'Последняя четверть',
      description: 'Половина луны освещена. Видна во второй половине ночи и утром.',
      phase: 0.75,
      image: 'last-quarter.png'
    },
    {
      name: 'Старая луна',
      description: 'Тонкий серп луны появляется на восточном небе перед рассветом.',
      phase: 0.875,
      image: 'waning-crescent.png'
    }
  ];

  res.render('phases', {
    title: 'LUNA - Фазы Луны',
    phases: phases
  });
});

/* Страница фактов */
router.get('/facts', function(req, res, next) {
  var facts = [
    {
      title: 'Возраст Луны',
      text: 'Луна образовалась около 4.5 миллиардов лет назад, вероятно, в результате столкновения Земли с объектом размером с Марс.'
    },
    {
      title: 'Расстояние до Луны',
      text: 'Среднее расстояние от Земли до Луны составляет 384,400 км. Луна удаляется от Земли примерно на 3.8 см в год.'
    },
    {
      title: 'Размер Луны',
      text: 'Диаметр Луны составляет 3,474 км - это примерно четверть диаметра Земли. Луна - пятый по величине спутник в Солнечной системе.'
    },
    {
      title: 'Гравитация на Луне',
      text: 'Гравитация на Луне составляет всего 16.6% от земной. Если вы весите 100 кг на Земле, на Луне ваш вес будет около 17 кг.'
    },
    {
      title: 'Одна сторона Луны',
      text: 'С Земли всегда видна только одна сторона Луны из-за синхронного вращения. Обратную сторону впервые сфотографировала советская станция "Луна-3" в 1959 году.'
    },
    {
      title: 'Лунные моря',
      text: 'Темные пятна на Луне называются морями, хотя воды там нет. Это огромные базальтовые равнины, образовавшиеся из древних лавовых потоков.'
    },
    {
      title: 'Температура',
      text: 'Температура на Луне колеблется от -173°C ночью до +127°C днем из-за отсутствия атмосферы.'
    },
    {
      title: 'Лунотрясения',
      text: 'На Луне происходят лунотрясения, вызванные приливными силами Земли и температурными изменениями.'
    }
  ];

  res.render('facts', {
    title: 'LUNA - Факты о Луне',
    facts: facts
  });
});

/* Страница галереи */
router.get('/gallery', function(req, res, next) {
  var images = [
    {
      title: 'Полная Луна',
      description: 'Детальный снимок полной Луны с кратерами',
      filename: 'moon1.svg'
    },
    {
      title: 'Кратеры Луны',
      description: 'Крупный план лунных кратеров - следы древних столкновений',
      filename: 'moon2.svg'
    },
    {
      title: 'Луна над горизонтом',
      description: 'Восход Луны над земным горизонтом',
      filename: 'moon3.svg'
    },
    {
      title: 'Обратная сторона Луны',
      description: 'Невидимая с Земли сторона Луны - более изрытая кратерами',
      filename: 'moon4.svg'
    }
  ];

  res.render('gallery', {
    title: 'LUNA - Галерея',
    images: images
  });
});

/* Страница наблюдений - ОТКЛЮЧЕНО */
// router.get('/observations', function(req, res, next) {
//   Observation.find({})
//     .sort({ date: -1 })
//     .limit(10)
//     .then(observations => {
//       var moonIllumination = SunCalc.getMoonIllumination(new Date());
//       var phaseName = getMoonPhaseName(moonIllumination.phase);

//       res.render('observations', {
//         title: 'LUNA - Мои наблюдения',
//         observations: observations,
//         currentPhase: phaseName
//       });
//     })
//     .catch(err => {
//       next(err);
//     });
// });

/* POST запрос для сохранения наблюдения - ОТКЛЮЧЕНО */
// router.post('/observations/submit', function(req, res, next) {
//   var newObservation = new Observation({
//     userName: req.body.userName,
//     moonPhase: req.body.moonPhase,
//     observation: req.body.observation
//   });

//   newObservation.save()
//     .then(() => {
//       res.redirect('/observations');
//     })
//     .catch(err => {
//       next(err);
//     });
// });

module.exports = router;
