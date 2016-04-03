var objective = "Предметное мышление (предметно-действеное). " +
        "Люди с практическим складом ума предпочитают предметное мышление, " +
        "для которого характерны неразрывная связь с предметом в пространстве и времени, " +
        "осуществление преобразования информации с помощью предметных действий, последовательное выполнение операций. " +
        "Существуют физические ограничения на преобразование. " +
        "Результатом такого типа мышления становится мысль, воплощенная в новой конструкции.",

    symbolic = "Символическое мышление (абстрактно-символическое). " +
        "Люди с математическим складом ума отдают предпочтение символическому мышлению, " +
        "когда происходит преобразование информации с помощью правил вывода " +
        "(в частности, алгебраических правил или арифметических знаков и операций). " +
        "Результатом является мысль, выраженная в виде структур и формул, фиксирующих существенные отношения между символами.",

    sign = "Знаковое мышление (словесно-логическое). " +
        "Личности с гуманитарным складом ума предпочитают знаковое мышление. " +
        "Оно характеризуется преобразованием информации с помощью умозаключений. " +
        " Знаки объединяются в более крупные единицы по правилам единой грамматики. " +
        "Результатом является мысль в форме понятия или высказывания, " +
        "фиксирующего существенные отношения между обозначаемыми предметами.",

    figurative = "Образное мышление (наглядно-образное). " +
        "Люди с художественным складом ума предпочитают образный тип мышления. " +
        "Это отделение от предмета в пространстве и времени, осуществление преобразования информации с помощью действий с образами. " +
        "Нет физических ограничений на преобразование. " +
        "Операции могут осуществляться как последовательно, так и одновременно. " +
        "Результатом служит мысль, воплощенная в новом образе.",

    creativity = "Креативность - творческие способности человека, характеризующиеся готовностью к созданию принципиально новых идей. " +
        "По мнению П. Торренса, креативность включает в себя повышенную чувствительность к проблемам, " +
        "к дефициту или противоречивости знаний, действия по определению этих проблем, " +
        "по поиску их решений на основе выдвижения гипотез, по проверке и изменению гипотез, по формулированию результата решения. " +
        "Для развития творческого мышления используются обучающие ситуации, " +
        "которые характеризуются незавершенностью или открытостью для включения новых элементов, " +
        "поощряется к формулировка множества вопросов.";

module.exports = {
    name: "Тест на мышление и креативность",
    type: require('../types').THINKING_CREATIVITY,
    icon: 'yeoman.png',
    shortDesc: "У каждого человека преобладает определенный тип мышления. Данный опросник поможет вам определить тип своего мышления.",
    longDesc: "Мышление - это индивидуальный способ переработки поступающей информации, форма психического отражения человеком действительности, создавая взаимосвязи и отношения между изучаемыми понятиями, явлениями Опросник Определение типов мышления и уровня креативности (творческих способностей) Дж. Брунера позволяет определить базовый тип мышления и измерить уровень креативности у взрослых. Зная свой тип мышления, можно уверенно сказать в какой области, профессии вы преуспеете. Выделяют 4 базовых типа мышления, каждый из которых обладает специфическими характеристиками: предметное, образное, знаковое и символическое мышление. Джером Брунер рассматривал мышление как перевод с одного языка на другой. Таким образом, при четырех базовых языках возникает шесть вариантов перевода: предметно-образный (практический), предметно-знаковый (гуманитарный), предметно-символический (операторный), образно-знаковый (художественный), образно-символический (технический), знаково-символический (теоретический). Выделяются следующие факторы мышления: практичность — теоретичность; гуманитарность — техничность; художественность — операторность; конкретность — абстрактность.",
    instruction: "Если вы согласны с высказыванием, то нажмите на галочку, в ином случае на крестик.",
    content: {
        questions: [
            "Мне легче что-либо сделать, чем объяснить, почему я так сделал(а).",
            "Я люблю настраивать программы для компьютера.",
            "Я люблю читать художественную литературу.",
            "Я люблю живопись (скульптуру).",
            "Я не предпочел(а) бы работу, в которой все четко определено.",
            "Мне проще усвоить что-либо, если я имею возможность манипулировать предметами.",
            "Я люблю шахматы, шашки.",
            "Я легко излагаю свои мысли как в устной, так и в письменной форме.",
            "Я хотел(а) бы заниматься коллекционированием.",
            "Я люблю и понимаю абстрактную живопись.",
            "Я скорее хотел(а) бы быть слесарем, чем инженером.",
            "Для меня алгебра интереснее, чем геометрия.",
            "В художественной литературе для меня важнее не что сказано, а как сказано.",
            "Я люблю посещать зрелищные мероприятия.",
            "Мне не нравится регламентированная работа.",
            "Мне нравится что-либо делать своими руками.",
            "В детстве я любил(а) создавать свою систему слов/знаков/шифр для переписки с друзьями.",
            "Я придаю большое значение форме выражения мыслей.",
            "Мне трудно передать содержание рассказа без его образного представления.",
            "Не люблю посещать музеи, так как все они одинаковы.",
            "Любую информацию я воспринимаю как руководство к действию.",
            "Меня больше привлекает товарный знак фирмы, чем ее название.",
            "Меня привлекает работа комментатора радио, телевидения.",
            "Знакомые мелодии вызывают у меня в голове определенные картины.",
            "Люблю фантазировать.",
            "Когда я слушаю музыку, мне хочется танцевать.",
            "Мне интересно разбираться в чертежах и схемах.",
            "Мне нравятся художественная литература.",
            "Знакомый запах вызывает всю картину событий, происшедших много лет назад.",
            "Разнообразные увлечения делают жизнь человека богаче.",
            "Истинно только то, что можно потрогать руками.",
            "Я предпочитаю точные науки.",
            "Я за словом в карман не лезу.",
            "Люблю рисовать.",
            "Один и тот же спектакль/фильм можно смотреть много раз, главное — игра актеров, новая интерпретация.",
            "Мне нравилось в детстве собирать механизмы из деталей конструктора.",
            "Мне кажется, что я смог(ла) бы изучить стенографию.",
            "Мне нравится читать стихи вслух.",
            "Я согласен(а) с утверждением, что красота спасет мир.",
            "Я предпочел(а) бы быть закройщиком, а не портным.",
            "Лучше сделать табуретку руками, чем заниматься ее проектированием.",
            "Мне кажется, что я смог(ла) бы овладеть профессией программиста.",
            "Люблю поэзию.",
            "Прежде чем изготовить какую-то деталь, сначала я делаю чертеж.",
            "Мне больше нравится процесс деятельности, чем ее конечный результат.",
            "Для меня лучше поработать в мастерской, нежели изучать чертежи.",
            "Мне интересно было бы расшифровать древние тайнописи.",
            "Если мне нужно выступить, то я всегда готовлю свою речь, хотя уверен(а), что найду необходимые слова.",
            "Больше люблю решать задачи по геометрии, чем по алгебре.",
            "Даже в отлаженном деле пытаюсь творчески изменить что-то.",
            "Я люблю дома заниматься рукоделием, мастерить.",
            "Я смог(ла) бы овладеть языками программирования.",
            "Мне нетрудно написать сочинение на заданную тему.",
            "Мне легко представить образ несуществующего предмета или явления.",
            "Я иногда сомневаюсь даже в том, что для других очевидно.",
            "Я предпочел(а) бы сам(а) отремонтировать утюг, нежели нести его в мастерскую.",
            "Я легко усваиваю грамматические конструкции языка.",
            "Люблю писать письма.",
            "Сюжет кинофильма могу представить как ряд образов.",
            "Абстрактные картины дают большую пищу для размышлений.",
            "В школе мне больше всего нравились уроки труда, домоводства.",
            "У меня не вызывает затруднений изучение иностранного языка.",
            "Я охотно что-то рассказываю, если меня просят друзья.",
            "Я легко могу представить в образах содержание услышанного.",
            "Я не хотел(а) бы подчинять свою жизнь определенной системе.",
            "Я чаще сначала сделаю, а потом думаю о правильности, решения.",
            "Думаю, что смог(ла) бы изучить китайские иероглифы.",
            "Не могу не поделиться только что услышанной новостью.",
            "Мне кажется, что работа сценариста/писателя интересна.",
            "Мне нравится работа дизайнера.",
            "При решении какой-то проблемы мне легче идти методом проб и ошибок.",
            "Изучение дорожных знаков не составило / не составит мне труда.",
            "Я легко нахожу общий язык с незнакомыми людьми.",
            "Меня привлекает работа художника-оформителя.",
            "Не люблю ходить одним и тем же путем."
        ],
        thinkingTypes: ["Предметное мышление", "Символическое мышление", "Знаковое мышление", "Образное мышление", "Креативность"],
        description: [objective, symbolic,  sign, figurative, creativity],
        levels: {
            low: "низкий",
            medium: "средний",
            high: "высокий"
        }
    },
    func: function (answers) {
        let answersSums = [0, 0, 0, 0, 0],
            result = [];

        for (let i = 0; i < answers.length; i++) {
            answersSums[i % 5] += answers[i] ? 1 : 0;
        }

        for (let score of answersSums) {
            let level;

            if (score <= 5) level = 'low';
            else if (score <= 9) level = 'medium';
            else level = 'high';

            result.push({score, level});
        }

        return {result};
    }
};
