import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();
async function main() {
  await prisma.posts.deleteMany({});
  await prisma.reviews.deleteMany({});
  await prisma.redeemCoupons.deleteMany({});
  await prisma.coupons.deleteMany({});
  await prisma.courseOrderDetails.deleteMany({});
  await prisma.courseOrders.deleteMany({});

  await prisma.announcements.deleteMany({});
  await prisma.announcementsContents.deleteMany({});
  await prisma.handclaps.deleteMany({});
  await prisma.articles.deleteMany({});
  await prisma.categoriesProfilesMap.deleteMany({});
  await prisma.userProfiles.deleteMany({});
  await prisma.categoriesCoursesMap.deleteMany({});
  await prisma.works.deleteMany({});
  await prisma.sections.deleteMany({});
  await prisma.chapters.deleteMany({});
  await prisma.shoppingCarts.deleteMany({});
  await prisma.bookMarks.deleteMany({});
  await prisma.categories.deleteMany({});
  await prisma.courses.deleteMany({});
  await prisma.users.deleteMany({});

  const admin = await prisma.users.create({
    data: {
      username: 'Knock Knowledge.',
      password: await argon.hash('admin'),
      email: 'admin@kk.com',
      phoneNumber: '00000001',
      isAdmin: true,
      isActive: true,
    },
  });

  const user1 = await prisma.users.create({
    data: {
      username: 'Buford Coleman',
      password: await argon.hash('1234'),
      email: '123@123.com',
      phoneNumber: '91231231',
      isAdmin: false,
      isActive: true,
    },
  });

  const user2 = await prisma.users.create({
    data: {
      username: 'Aurelia Mccann',
      password: await argon.hash('1234'),
      email: '123@12333.com',
      phoneNumber: '912313211',
      isAdmin: false,
      isActive: true,
    },
  });

  const user3 = await prisma.users.create({
    data: {
      username: 'Deandre Mills',
      password: await argon.hash('1234'),
      email: 'deandre_mills@gamil.com',
      phoneNumber: '000000003',
      isAdmin: false,
      isActive: true,
    },
  });

  const user4 = await prisma.users.create({
    data: {
      username: 'Mable Richardson',
      password: await argon.hash('1234'),
      email: 'mable_richardson@gmail.com',
      phoneNumber: '000000004',
      isAdmin: false,
      isActive: true,
    },
  });

  const user5 = await prisma.users.create({
    data: {
      username: 'Wilfred Peters',
      password: await argon.hash('1234'),
      email: 'wilfred_peters@gmail.com',
      phoneNumber: '000000005',
      isAdmin: false,
      isActive: true,
    },
  });

  const user6 = await prisma.users.create({
    data: {
      username: 'Todd Howell',
      password: await argon.hash('1234'),
      email: 'todd_howell@gmail.com',
      phoneNumber: '000000006',
      isAdmin: false,
      isActive: true,
    },
  });

  const category_entertainment = await prisma.categories.create({
    data: {
      name: 'Entertainment',
      coverImage:
        'https://images.unsplash.com/photo-1675060176145-3de509b333db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    },
  });

  const category_lifestyle = await prisma.categories.create({
    data: {
      name: 'Lifestyle',
      coverImage:
        'https://images.pexels.com/photos/15338211/pexels-photo-15338211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  });

  const category_writing = await prisma.categories.create({
    data: {
      name: 'Writing',
      coverImage:
        'https://images.unsplash.com/photo-1595007872945-3d591b6d2a5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    },
  });

  const category_business = await prisma.categories.create({
    data: {
      name: 'Business',
      coverImage:
        'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    },
  });

  const category_food = await prisma.categories.create({
    data: {
      name: 'Food',
      coverImage:
        'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    },
  });

  const course4 = await prisma.courses.create({
    data: {
      name: "Improving Your Sleep: Guide to a good night's rest",
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/4.jpeg',
      shortDescription:
        'This online course from Harvard Health Publishing explains why a good night’s sleep is important to your health and well-being and shows you how to achieve it.',
      longDescription:
        'Improving Your Sleep will show you how to overcome the obstacles interfering with the good night’s rest you want and your body needs. You’ll find why sleep often eludes us as adults. You’ll explore habits and conditions that can rob you of peaceful slumber. And most important, you’ll learn the changes you can make and steps you can take to restore consistently restful and restorative sleep. Is snoring causing strife? Could sleep apnea be threatening a loved one’s life—or yours? The course provides instructive guidance to address these sleep breathing disorders as well as other common sleep disturbances including Restless Leg Syndrome, sleep/wake cycle disorders, narcolepsy, jet lag, and even sleepwalking.',
      courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/4.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 1948,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 1948,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  const course5 = await prisma.courses.create({
    data: {
      name: 'Yoga and You',
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/5.png',
      shortDescription:
        'Expert yoga trainers will help guide you along, with detailed instructions and safe practice tips.',
      longDescription:
        'Looking for safe and natural solutions to stay fit and healthy well into your 50s, 60s, and beyond? Think Yoga! Yoga is a powerful 2000-year old practice you can use to ease pain, lower blood pressure, boost immunity, reduce anxiety, and protect against the stresses of life\n\nNumerous studies support Yoga’s health benefits. A meta-analysis of 37 randomized controlled trials found that yoga can have a beneficial impact on numerous risk factors for heart disease. There’s no need to travel. Simply roll out the yoga mat and click ‘play’.\n\nStart your yoga practice with a popular and simple warm-up routine called “10 Churnings.” Then start practicing with yoga movements for all skill levels:\n\n5 Chair Yoga Exercises9 Standing Yoga Practice11 Floor Yoga Practice\n\nOur demonstration videos show you the proper form for more than 30 exercises in all. As you progress, you’ll discover how using the “four elements of yoga” affects your physical and mental health, emotions, stress, mind-body awareness, mindfulness, and spirituality.',
      courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/4.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 1022,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 1022,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  const course6 = await prisma.courses.create({
    data: {
      name: 'Prostate Diseases and Erectile Dysfunction',
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/6.jpeg',
      shortDescription:
        ' Harvard doctors assess today’s treatment options for prostate cancer, BPH, and ED to help you select what’s best for your health, your happiness and your peace-of-mind.',
      longDescription:
        'For a man, health decisions don’t get much more personal than the ones you’re asked to make when you confront ED, suffer worsening BPH, or are suddenly diagnosed with prostate cancer. From your brother-in-law to your buddies at the gym, others may have opinions on what you should do. Even doctors have a bias toward their own specialty. But, ultimately, the decision is yours. To decide intelligently, you need to know the pros and cons of today’s growing number of treatment options. What’s best for your age, your condition, your concerns, and your future? How does nerve-sparing surgery compare with radiation therapy? Would you be comfortable with active surveillance for prostate cancer? Which BPH medications should you consider? Which to avoid? Can you reverse ED without reverting to medication?\n\nPrepared by the doctors of Harvard Medical School, this online course gives needed foundation to the choices almost all men will have to make. From testing to treatment, you’ll be apprised of effectiveness, suitability, accessibility, and the potential side effects you may face.Prostate Diseases and Erectile Dysfunction is loaded with informative videos, interactive pages, and helpful downloadable charts. It will strengthen your resolve and most important, clarify your choices.',
      courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/4.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 1022,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 1022,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  const course7 = await prisma.courses.create({
    data: {
      name: 'Christianity Through Its Scriptures',
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/7.png',
      shortDescription:
        'Learn about Christianity through a study of its sacred scriptures. We will explore how diverse Christians have interpreted these writings and practiced their teachings over a 2000 year, global history.',
      longDescription:
        '"Christianity is a global religion. From modest beginnings 2,000 years ago, it has grown to encompass nearly a third of the human population. Diverse in languages, cultures, histories, and creeds, Christians nonetheless share a common collection of sacred scripture called the Bible.\n\nThis religion course introduces you to the Bible and its scripture and asks the questions: What are the contents, languages, and forms of Bibles in various times and places? How have Christians lived out their stories and teachings? How does Christian history reflect the contested and varied uses of scripture—in the ancient Roman world where Christianity began, in its spread through European and American colonialism, in the diverse forms it takes in varied locations around the globe?\n\nYou will begin to explore these questions and others while learning about the content and interpretations of these sacred texts."',
      courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/4.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 887,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 887,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  const course8 = await prisma.courses.create({
    data: {
      name: 'Japanese Books: From Manuscript to Print',
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/8.jpg',
      shortDescription:
        'Study Japanese scroll art as text and as "little movies" that immerse the viewer through visual narration.',
      longDescription:
        'This course expands the definition of the “book” to include scrolls and albums, focusing on the reading experience of a variety of formats in Japan. You will begin by examining rare and beautifully preserved manuscripts in the Harvard Art Museums in an introduction exploring the material properties of Japanese books and scrolls, binding techniques, and important terminology. An examination of the illustrated scroll comes next, through a unit on the short story and visual storytelling in premodern Japan. The course concludes with The Tale of Genji , an overview of how this celebrated epic from the eleventh century was read and illustrated in every conceivable format, from scroll, to album, to printed book, into the modern era.\n\nDrawing on the rich collections of Harvard’s libraries and museums, this course is part of a larger series on the history of books, where learners explore the book not merely as a container of content, but as significant physical objects that have shaped the way we understand the world around us.',
      courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/4.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 541,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 541,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  const course9 = await prisma.courses.create({
    data: {
      name: "Shakespeare's Life and Work",
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/9.jpg',
      shortDescription:
        "Learn how to read William Shakespeare's plays through his biography, Elizabethan and Jacobean history, and modern performance.",
      longDescription:
        "How do we read Shakespeare? Do his plays belong to the past or the present? To a famed dramatic genius or to readers and audiences around the globe? What do his plays really mean?\n\nMoving between the world in which Shakespeare lived and the present day, this course will introduce different kinds of literary analysis that you can use when reading Shakespeare. With short videos filmed on location in England and readings covering topics like Shakespeare's contemporaries and the politics of modern performance, you will learn a range of critical tools that you can use to unlock the meaning and relevance of Shakespeare’s plays.\n\nJoin us as we visit Stratford-upon-Avon, where Shakespeare was born in 1564; London, the lively city where he began as an actor; and the Globe Theater, where his first plays were performed. This journey through Shakespeare’s life will transport you to another era and will give you a new perspective on his timeless work.",
      courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/4.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 270,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 270,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  const course10 = await prisma.courses.create({
    data: {
      name: 'Effective Writing for Health Care',
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/10.jpg',
      shortDescription:
        'This Harvard Medical School one-year, application-based certificate program is designed to help clinicians, researchers and allied health professionals achieve their writing career goals.',
      longDescription:
        'How well we formulate arguments, present data and convey messages has an enormous impact on our ability to achieve our professional goals. Our communication skills affect the way grant proposals are received and reviewed, how peers consider our work and ideas, and whether—and how—the public embraces our viewpoints and opinions. \n\nThe Effective Writing for Health Care program is designed to help learners improve their writing skills, process, quality, reach, impact and the likelihood of publication or funding through a core curriculum and one of three specialized tracks: Writing for Medical and Scientific Journals, Writing Grant Proposals, or Writing for the Public. The program’s schedule and learning models are designed to accelerate and elevate communication skills with minimal time away from practice or research activities. \n\nThis program features a blended learning model comprising live workshops, self-paced on-demand sessions, live webinars and writing exercises that work to elevate your writing skills. These exercises can be tailored to your specific writing goals. Each specialized track culminates in a capstone project, where each participant develops a submission-ready written work. \n\nParticipants will be eligible for Associate Alumni status upon successful completion of the program. Early tuition and need-based tuition reductions may be available.',
      courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/4.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 752,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 752,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  const course11 = await prisma.courses.create({
    data: {
      name: 'Creative Thinking: Innovative Solutions to Complex Challenges',
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/11.jpg',
      shortDescription:
        'Learn how to grow a culture of creativity to innovate competitive solutions.',
      longDescription:
        "Leverage your team's creativity to solve complex problems and innovate. Learn how to facilitate creative problem-solving, cultivate courage, inspire teams, and build a climate for innovation. ",
      courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/4.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 0,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 0,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  const course12 = await prisma.courses.create({
    data: {
      name: 'Building Organizational Cultures: A Framework for Leaders',
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/12.jpg',
      shortDescription:
        'Critically assess how culture affects organizations and learn how to create an environment that promotes advancement of people.',
      longDescription:
        "Learn tools and strategies for building a workplace culture that promotes advancement of both your organization and its people. Through case studies, reflection, and discussion, you'll develop the skills to critically assess and influence change in your organizational culture.",
      courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/4.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 698,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 698,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  const course13 = await prisma.courses.create({
    data: {
      name: 'Strategy Execution for Public Leadership',
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/13.png',
      shortDescription:
        'Join Harvard Kennedy School faculty and former Pentagon Chief of Staff Eric Rosenbach to learn how to develop strategies for public leadership success.',
      longDescription:
        'How do you execute a strategic initiative that has long-lasting impact? Do you know how to effectively communicate your strategic approach, gathering input and support from key stakeholders? How will you anticipate and respond to scrutiny from shareholders, news media, and the public?\n\nPublic sector leaders face unique challenges when it comes to making strategic, business-oriented decisions. If not thoroughly planned and executed, these decisions have real consequences with high-stakes outcomes. What can we learn from world leaders and experts who have faced these monumental decisions? How can you create a high performing team to successfully execute strategic ideas?\n\nIn Strategy Execution for Public Leadership, former United States Pentagon Chief of Staff and Assistant Secretary of Defense for Homeland Defense and Global Security Eric Rosenbach will lead you through real-life public sector challenges, showing you how purpose-driven strategy and execution lead to long-term adoption and success.\n\nBy studying decisions of key public leaders, like Former United States Secretary of Defense Ash Carter, you will better understand how to develop strategies that not only align with your organizational goals, but also gain insight into the challenges and scrutiny that come along with making public decisions. Too often, public strategies fail because leaders don’t think about execution, which is made up of leadership and management tools, as well as a team who anticipates all scenarios prior to putting your plan into place. Through global case studies and protagonist examples, you will explore topics that set you on a path to strengthen your public leadership, including resource and budget planning, talent recruitment and retention, strategic communications and crisis management, and risk planning and mitigation tactics.\n\nBy the end of this course, you will not only have the tools to create a sound public strategy, but also know how to test and optimize your strategy, increase competitive advantage, and sustain long-term impact and success.\n\nStrategy is not one-size-fits-all. Implement a public leadership approach for long-term success.',
      courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/4.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 535,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 535,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  const course14 = await prisma.courses.create({
    data: {
      name: 'Compensation Committees: New Challenges, New Solutions',
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/14.jpg',
      shortDescription:
        'Structure more effective compensation plans to drive long-term performance, profitability, and employee satisfaction.',
      longDescription:
        'Executive compensation has become a flashpoint issue for board members, institutional investors, regulators, and the media. Examining critical market and regulatory issues, this board leadership program enables compensation committee chairs and members to design more effective compensation programs. You will explore best practices for aligning executive pay to business strategy and company goals and for meeting shareholder expectations as the regulatory climate evolves.\n\nFocused on developing practices that link executive rewards to corporate goals, this board leadership program will help you excel in your compensation role, make better decisions, and guide your organization through the complex issues related to executive compensation. Through a rich learning experience that includes faculty presentations, case studies, and small group discussions, the program explores key questions across a number of critical areas.',
      courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/4.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 676,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 676,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  const course15 = await prisma.courses.create({
    data: {
      name: 'Lose Weight and Keep It Off',
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/15.jpg',
      shortDescription:
        'This Harvard Health Publishing online course incorporates the latest evidence-based strategies that allow you to tailor a healthy weight loss plan that works best for you.',
      longDescription:
        'This Harvard Health Publishing online course helps you customize a plan that you can live with to reach your weight loss goals. It is overflowing with simple eating plans, practical hints and tips, food charts, and more — all the tools you need to help you reach and maintain your ideal weight.',
      courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/4.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 676,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 676,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  const course16 = await prisma.courses.create({
    data: {
      name: 'Health and Wellness: Designing a Sustainable Nutrition Plan',
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/16.jpg',
      shortDescription:
        'This is a Harvard Medical School online executive education program designed to give you the tools and confidence to create personalized healthy living plans for clients, patients, friends and yourself.',
      longDescription:
        'The demand for accurate nutrition guidance from experienced coaches is increasing as populations age and our understanding of healthy living and eating grows. Lifestyle medicine—the evidence-based practice of helping people adopt and sustain healthy behaviors, such as improving diet, increasing activity, managing stress and sleeping well—drives the need for comprehensive patient support as both a preventative measure and treatment option. Health coaches, nutritionists and lifestyle trainers have a bright opportunity to improve their credentials and confidence and coach clients and patients with uniquely personalized plans. Learn lifestyle coaching methods that influence behavioral change and support healthy choices. Examine the six pillars of lifestyle medicine to develop evidence-based nutrition plans and motivate lifestyle changes.',
      courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/4.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 351,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 351,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  const course17 = await prisma.courses.create({
    data: {
      name: 'Healthy Eating for Type 2 Diabetes',
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/17.jpg',
      shortDescription:
        'This easy-to-follow online course to help you better manage diabetes through a healthy diet combined with lifestyle choices like regular exercise. ',
      longDescription:
        'Step-by-step, this easy-to-follow Course helps you better understand Type 2 Diabetes and shows how you can help control it with easy-to-apply lifestyle changes.\n\nLuscious recipes, breakthrough nutritional advice, engaging videos, helpful charts and a variety of easy-to-use tools clearly answer your questions. Best of all, these potent tools come straight from the medical experts at Harvard Medical School. Through our interactive features, videos, charts, and quizzes, you’ll learn it’s possible not just to LIVE with diabetes, but to live WELL.',
      courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/4.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 865,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 865,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  const course18 = await prisma.courses.create({
    data: {
      name: '6-Week Plan For Healthy Eating',
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/18.jpg',
      shortDescription:
        'This online course from Harvard Health Publishing outlines a simple, 6-week plan assembled by Harvard experts to overhaul your diet and nutrition.',
      longDescription:
        'Although each food choice we make may seem small, it’s the little decisions we make each day that can derail our health goals and increase our risk for heart disease, stroke, diabetes and even cancer. In this all-new online course, Harvard Health Publishing presents an engaging, empowering and exciting way to learn about healthy eating. While the course is designed as a 6-week plan, you can watch and learn at your own pace. \n\nAll the tips, techniques and healthy food secrets are explained by our experts through fascinating slides, informative charts, interactive exercises and entertaining quizzes. You’ll get worksheets, a food diary, shopping lists and more that you can download and print to motivate you and help you stay on track.',
      courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/4.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 324,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 324,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  const course3 = await prisma.courses.create({
    data: {
      name: "CS50's Introduction to Programming with Scratch",
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/3.png',
      shortDescription:
        'A gentle introduction to programming that prepares you for subsequent courses in coding.',
      longDescription:
        "An introduction to programming using Scratch, a visual programming language via which aspiring programmers can write code by dragging and dropping graphical blocks (that resemble puzzle pieces) instead of typing out text. Used at the start of Harvard College's introductory course in computer science, CS50, Scratch was designed at MIT's Media Lab, empowering students with no prior programming experience to design their own animations, games, interactive art, and stories. Using Scratch, this course introduces students to fundamentals of programming, found not only in Scratch itself but in traditional text-based languages (like Java and Python) as well. Topics include: functions, which are instructions that perform tasks; return values, which are results that functions provide; conditions, via which programs can decide whether or not to perform some action; loops, via which programs can take action again and again; variables, via which programs can remember information; and more. Ultimately, this course prepares students for subsequent courses in programming.",
      courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/3.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 973,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 973,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  const course2 = await prisma.courses.create({
    data: {
      name: 'CS50: Introduction to Computer Science',
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/2.png',
      shortDescription:
        'An introduction to the intellectual enterprises of computer science and the art of programming.',
      longDescription:
        "This is CS50x , Harvard University's introduction to the intellectual enterprises of computer science and the art of programming for majors and non-majors alike, with or without prior programming experience. An entry-level course taught by David J. Malan, CS50x teaches students how to think algorithmically and solve problems efficiently. Topics include abstraction, algorithms, data structures, encapsulation, resource management, security, software engineering, and web development. Languages include C, Python, SQL, and JavaScript plus CSS and HTML. Problem sets inspired by real-world domains of biology, cryptography, finance, forensics, and gaming. The on-campus version of CS50x , CS50, is Harvard's largest course. \n\nStudents who earn a satisfactory score on 9 problem sets (i.e., programming assignments) and a final project are eligible for a certificate. This is a self-paced course–you may take CS50x on your own schedule.",
      courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/2.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 676,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 676,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  const course1 = await prisma.courses.create({
    data: {
      name: "CS50's Introduction to Game Development",
      courseImage: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/cover/1.png',
      shortDescription:
        'Learn about the development of 2D and 3D interactive games in this hands-on course, as you explore the design of games such as Super Mario Bros., Pokémon, Angry Birds, and more.',
      longDescription:
        "#### Learn about the development of 2D and 3D interactive games in this hands-on course, as you explore the design of games such as Super Mario Bros., Pokémon, Angry Birds, and more.\n\nIn a quest to understand how video games themselves are implemented, you'll explore the design of such childhood games as: Super Mario Bros., Pong, Flappy Bird, Breakout, Match 3, Legend of Zelda, Angry Birds, Pokémon, 3D Helicopter Game, Dreadhalls, and Portal.\n\nVia lectures and hands-on projects, the course explores principles of 2D and 3D graphics, animation, sound, and collision detection using frameworks like Unity and LÖVE 2D, as well as languages like Lua and C#. By class’s end, you'll have programmed several of your own games and gained a thorough understanding of the basics of game design and development.",
      courseIntroVideo:
        'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/1/1-0-Introduction.mp4',
      status: 'pending',
      ownerId: admin.id,
      sellingPrice: 1049,
      courseMinimumSize: 10,
      courseTotalDuration: 10,
      fundraisePrice: 1049,
      fundraiseStartDate: new Date('2022-12-01'),
      fundraiseEndDate: new Date('2023-01-01'),
      courseStartDate: new Date('2023-02-01'),
    },
  });

  // const course1 = await prisma.courses.create({
  //   data: {
  //     status: 'pending',
  //     ownerId: admin.id,
  //     name: 'cursus metus aliquam eleifend mi',
  //     sellingPrice: 1158,
  //     courseMinimumSize: 10,
  //     courseTotalDuration: 10,
  //     courseImage:
  //       'https://images.unsplash.com/photo-1675060176145-3de509b333db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
  //     courseIntroVideo: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/video/1.mp4',
  //     longDescription:
  //       '#### adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel facilisis volutpat est velit egestas dui. Sed lectus vestibulum mattis ullamcorper. Enim nec dui nunc mattis enim ut. Consequat id porta nibh venenatis cras sed felis eget.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa sapien faucibus et molestie ac feugiat sed lectus. Egestas maecenas pharetra convallis posuere morbi leo. Proin fermentum leo vel orci porta non pulvinar neque laoreet. Commodo odio aenean sed adipiscing diam donec adipiscing tristique risus. Tempor id eu nisl nunc mi ipsum faucibus vitae aliquet. Sit amet nulla facilisi morbi tempus iaculis. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Volutpat diam ut venenatis tellus.\n\n`hello`\n\n',
  //     shortDescription:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Non odio euismod lacinia at quis. Posuere morbi leo urna molestie at elementum. Eleifend donec pretium vulputate sapien nec. Amet facilisis magna etiam tempor. Metus dictum at tempor commodo ullamcorper a lacus vestibulum sed. Dictum fusce ut placerat orci nulla pellentesque dignissim enim sit. Ut tortor pretium viverra suspendisse potenti nullam ac tortor. Vivamus arcu felis bibendum ut tristique et. Urna cursus eget nunc scelerisque viverra. Lacinia quis vel eros donec ac odio tempor orci dapibus. Pellentesque nec nam aliquam sem. Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Mus mauris vitae ultricies leo. Nunc sed id semper risus in hendrerit gravida rutrum quisque.',
  //     fundraisePrice: 1158,
  //     fundraiseStartDate: new Date('2022-12-01'),
  //     fundraiseEndDate: new Date('2023-01-01'),
  //     courseStartDate: new Date('2023-01-01'),
  //   },
  // });

  const chapter_1_1 = await prisma.chapters.create({
    data: {
      courseId: course1.id,
      chapterName: 'Chapter 1',
      chapterOrderNum: 1,
    },
  });

  const section_1_1_1 = await prisma.sections.create({
    data: {
      chapterId: chapter_1_1.id,
      sectionName: 'Pong',
      sectionOrderNum: 1,
      isLocked: false,
      contentType: 'video',
      content: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/1/1-1-Pong.mp4',
    },
  });

  const section_1_1_2 = await prisma.sections.create({
    data: {
      chapterId: chapter_1_1.id,
      sectionName: 'Flappy Bird',
      sectionOrderNum: 2,
      contentType: 'video',
      content:
        'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/1/1-2-Flappy-Bird.mp4',
    },
  });

  const section_1_1_3 = await prisma.sections.create({
    data: {
      chapterId: chapter_1_1.id,
      sectionName: 'Breakout',
      sectionOrderNum: 3,
      contentType: 'video',
      content:
        'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/1/1-3-Breakout.mp4',
    },
  });

  const section_1_1_4 = await prisma.sections.create({
    data: {
      chapterId: chapter_1_1.id,
      sectionName: 'Work',
      sectionOrderNum: 4,
      contentType: 'text',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget duis at tellus at urna condimentum. Pellentesque massa placerat duis ultricies lacus. Et ultrices neque ornare aenean euismod elementum. Ut tellus elementum sagittis vitae. Semper viverra nam libero justo laoreet sit amet cursus sit. Fames ac turpis egestas integer. Diam vulputate ut pharetra sit. Dui sapien eget mi proin sed libero enim sed. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Netus et malesuada fames ac turpis egestas. Et leo duis ut diam quam nulla porttitor massa. Eget mauris pharetra et ultrices neque ornare aenean euismod. Integer vitae justo eget magna fermentum. Sit amet volutpat consequat mauris nunc congue nisi vitae suscipit. Risus pretium quam vulputate dignissim. Dui id ornare arcu odio ut sem nulla. Risus nec feugiat in fermentum posuere. Metus vulputate eu scelerisque felis imperdiet proin. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Mi quis hendrerit dolor magna eget. Morbi tristique senectus et netus et malesuada. Nec tincidunt praesent semper feugiat nibh sed. Nisl pretium fusce id velit ut tortor pretium. Bibendum enim facilisis gravida neque convallis a cras. Lacinia quis vel eros donec. Pretium fusce id velit ut tortor. Ultricies tristique nulla aliquet enim tortor at auctor. Cras ornare arcu dui vivamus arcu felis bibendum ut. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Dui accumsan sit amet nulla facilisi morbi tempus iaculis. Adipiscing vitae proin sagittis nisl rhoncus. Interdum velit euismod in pellentesque.',
    },
  });

  const chapter_1_2 = await prisma.chapters.create({
    data: {
      courseId: course1.id,
      chapterName: 'Chapter 2',
      chapterOrderNum: 2,
    },
  });

  const section_1_2_1 = await prisma.sections.create({
    data: {
      chapterId: chapter_1_2.id,
      sectionName: 'Match 3',
      sectionOrderNum: 1,
      isLocked: false,
      contentType: 'video',
      content:
        'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/1/1-4-Match-3.mp4',
    },
  });

  const section_1_2_2 = await prisma.sections.create({
    data: {
      chapterId: chapter_1_2.id,
      sectionName: 'Super Mario Bros',
      sectionOrderNum: 2,
      contentType: 'video',
      content:
        'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/1/1-5-Super-Mario-Bros.mp4',
    },
  });

  const section_1_2_3 = await prisma.sections.create({
    data: {
      chapterId: chapter_1_2.id,
      sectionName: 'Legend of Zelda',
      sectionOrderNum: 3,
      contentType: 'video',
      content:
        'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/1/1-6-Legend-of-Zelda.mp4',
    },
  });

  const section_1_2_4 = await prisma.sections.create({
    data: {
      chapterId: chapter_1_2.id,
      sectionName: 'Work',
      sectionOrderNum: 4,
      contentType: 'text',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget duis at tellus at urna condimentum. Pellentesque massa placerat duis ultricies lacus. Et ultrices neque ornare aenean euismod elementum. Ut tellus elementum sagittis vitae. Semper viverra nam libero justo laoreet sit amet cursus sit. Fames ac turpis egestas integer. Diam vulputate ut pharetra sit. Dui sapien eget mi proin sed libero enim sed. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Netus et malesuada fames ac turpis egestas. Et leo duis ut diam quam nulla porttitor massa. Eget mauris pharetra et ultrices neque ornare aenean euismod. Integer vitae justo eget magna fermentum. Sit amet volutpat consequat mauris nunc congue nisi vitae suscipit. Risus pretium quam vulputate dignissim. Dui id ornare arcu odio ut sem nulla. Risus nec feugiat in fermentum posuere. Metus vulputate eu scelerisque felis imperdiet proin. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Mi quis hendrerit dolor magna eget. Morbi tristique senectus et netus et malesuada. Nec tincidunt praesent semper feugiat nibh sed. Nisl pretium fusce id velit ut tortor pretium. Bibendum enim facilisis gravida neque convallis a cras. Lacinia quis vel eros donec. Pretium fusce id velit ut tortor. Ultricies tristique nulla aliquet enim tortor at auctor. Cras ornare arcu dui vivamus arcu felis bibendum ut. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Dui accumsan sit amet nulla facilisi morbi tempus iaculis. Adipiscing vitae proin sagittis nisl rhoncus. Interdum velit euismod in pellentesque.',
    },
  });

  const chapter_1_3 = await prisma.chapters.create({
    data: {
      courseId: course1.id,
      chapterName: 'Chapter 3',
      chapterOrderNum: 3,
    },
  });

  const section_1_3_1 = await prisma.sections.create({
    data: {
      chapterId: chapter_1_3.id,
      sectionName: 'Angry Birds',
      sectionOrderNum: 1,
      isLocked: false,
      contentType: 'video',
      content:
        'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/1/1-7-Angry-Birds.mp4',
    },
  });

  const section_1_3_2 = await prisma.sections.create({
    data: {
      chapterId: chapter_1_3.id,
      sectionName: '3D Helicopter Game',
      sectionOrderNum: 2,
      contentType: 'video',
      content:
        'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/1/1-8-Poke%CC%81mon.mp4',
    },
  });

  const section_1_3_3 = await prisma.sections.create({
    data: {
      chapterId: chapter_1_3.id,
      sectionName: 'Dreadhalls',
      sectionOrderNum: 3,
      contentType: 'video',
      content:
        'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/1/1-10-Dreadhalls.mp4',
    },
  });

  const section_1_3_4 = await prisma.sections.create({
    data: {
      chapterId: chapter_1_3.id,
      sectionName: 'Work',
      sectionOrderNum: 4,
      contentType: 'text',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget duis at tellus at urna condimentum. Pellentesque massa placerat duis ultricies lacus. Et ultrices neque ornare aenean euismod elementum. Ut tellus elementum sagittis vitae. Semper viverra nam libero justo laoreet sit amet cursus sit. Fames ac turpis egestas integer. Diam vulputate ut pharetra sit. Dui sapien eget mi proin sed libero enim sed. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Netus et malesuada fames ac turpis egestas. Et leo duis ut diam quam nulla porttitor massa. Eget mauris pharetra et ultrices neque ornare aenean euismod. Integer vitae justo eget magna fermentum. Sit amet volutpat consequat mauris nunc congue nisi vitae suscipit. Risus pretium quam vulputate dignissim. Dui id ornare arcu odio ut sem nulla. Risus nec feugiat in fermentum posuere. Metus vulputate eu scelerisque felis imperdiet proin. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Mi quis hendrerit dolor magna eget. Morbi tristique senectus et netus et malesuada. Nec tincidunt praesent semper feugiat nibh sed. Nisl pretium fusce id velit ut tortor pretium. Bibendum enim facilisis gravida neque convallis a cras. Lacinia quis vel eros donec. Pretium fusce id velit ut tortor. Ultricies tristique nulla aliquet enim tortor at auctor. Cras ornare arcu dui vivamus arcu felis bibendum ut. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Dui accumsan sit amet nulla facilisi morbi tempus iaculis. Adipiscing vitae proin sagittis nisl rhoncus. Interdum velit euismod in pellentesque.',
    },
  });

  const chapter_1_4 = await prisma.chapters.create({
    data: {
      courseId: course1.id,
      chapterName: 'Chapter 4',
      chapterOrderNum: 4,
    },
  });

  const section_1_4_1 = await prisma.sections.create({
    data: {
      chapterId: chapter_1_4.id,
      sectionName: 'Portal',
      sectionOrderNum: 1,
      isLocked: false,
      contentType: 'video',
      content:
        'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/1/1-11-Portal.mp4',
    },
  });

  const section_1_4_2 = await prisma.sections.create({
    data: {
      chapterId: chapter_1_4.id,
      sectionName: 'Portal Problems',
      sectionOrderNum: 2,
      contentType: 'video',
      content:
        'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/video/1/1-12-Portal-Problems.mp4',
    },
  });

  const section_1_4_4 = await prisma.sections.create({
    data: {
      chapterId: chapter_1_4.id,
      sectionName: 'Work',
      sectionOrderNum: 3,
      contentType: 'text',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget duis at tellus at urna condimentum. Pellentesque massa placerat duis ultricies lacus. Et ultrices neque ornare aenean euismod elementum. Ut tellus elementum sagittis vitae. Semper viverra nam libero justo laoreet sit amet cursus sit. Fames ac turpis egestas integer. Diam vulputate ut pharetra sit. Dui sapien eget mi proin sed libero enim sed. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Netus et malesuada fames ac turpis egestas. Et leo duis ut diam quam nulla porttitor massa. Eget mauris pharetra et ultrices neque ornare aenean euismod. Integer vitae justo eget magna fermentum. Sit amet volutpat consequat mauris nunc congue nisi vitae suscipit. Risus pretium quam vulputate dignissim. Dui id ornare arcu odio ut sem nulla. Risus nec feugiat in fermentum posuere. Metus vulputate eu scelerisque felis imperdiet proin. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Mi quis hendrerit dolor magna eget. Morbi tristique senectus et netus et malesuada. Nec tincidunt praesent semper feugiat nibh sed. Nisl pretium fusce id velit ut tortor pretium. Bibendum enim facilisis gravida neque convallis a cras. Lacinia quis vel eros donec. Pretium fusce id velit ut tortor. Ultricies tristique nulla aliquet enim tortor at auctor. Cras ornare arcu dui vivamus arcu felis bibendum ut. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Dui accumsan sit amet nulla facilisi morbi tempus iaculis. Adipiscing vitae proin sagittis nisl rhoncus. Interdum velit euismod in pellentesque.',
    },
  });

  const categoriesCoursesMap = await prisma.categoriesCoursesMap.createMany({
    data: [
      {
        courseId: course4.id,
        catrgoryId: category_lifestyle.id,
      },
      {
        courseId: course5.id,
        catrgoryId: category_lifestyle.id,
      },
      {
        courseId: course6.id,
        catrgoryId: category_lifestyle.id,
      },
      {
        courseId: course7.id,
        catrgoryId: category_writing.id,
      },
      {
        courseId: course8.id,
        catrgoryId: category_writing.id,
      },
      {
        courseId: course9.id,
        catrgoryId: category_writing.id,
      },
      {
        courseId: course10.id,
        catrgoryId: category_writing.id,
      },
      {
        courseId: course11.id,
        catrgoryId: category_business.id,
      },
      {
        courseId: course12.id,
        catrgoryId: category_business.id,
      },
      {
        courseId: course13.id,
        catrgoryId: category_business.id,
      },
      {
        courseId: course14.id,
        catrgoryId: category_business.id,
      },
      {
        courseId: course15.id,
        catrgoryId: category_food.id,
      },

      {
        courseId: course16.id,
        catrgoryId: category_food.id,
      },

      {
        courseId: course17.id,
        catrgoryId: category_food.id,
      },
      {
        courseId: course18.id,
        catrgoryId: category_food.id,
      },
      {
        courseId: course3.id,
        catrgoryId: category_entertainment.id,
      },
      {
        courseId: course2.id,
        catrgoryId: category_entertainment.id,
      },
      {
        courseId: course1.id,
        catrgoryId: category_entertainment.id,
      },
    ],
  });

  // const work1 = await prisma.works.create({
  //   data: {
  //     userId: user1.id,
  //     sectionId: section_1_1_1.id,
  //     content: 'works',
  //   },
  // });

  const article1 = await prisma.articles.create({
    data: {
      title: 'volutpat sed cras ornare arcu dui vivamus arcu felis bibendum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Congue eu consequat ac felis donec et odio. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Integer eget aliquet nibh praesent tristique. Arcu vitae elementum curabitur vitae. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Nibh tortor id aliquet lectus proin nibh. Nunc sed augue lacus viverra vitae congue. Amet commodo nulla facilisi nullam vehicula ipsum a.',
      coverImage: 'https://images.pexels.com/photos/14394485/pexels-photo-14394485.jpeg',
      ownerId: admin.id,
      categoryId: category_entertainment.id,
    },
  });

  const article2 = await prisma.articles.create({
    data: {
      title: 'volutpat sed cras ornare arcu dui vivamus arcu felis bibendum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Congue eu consequat ac felis donec et odio. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Integer eget aliquet nibh praesent tristique. Arcu vitae elementum curabitur vitae. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Nibh tortor id aliquet lectus proin nibh. Nunc sed augue lacus viverra vitae congue. Amet commodo nulla facilisi nullam vehicula ipsum a.',
      coverImage:
        'https://images.pexels.com/photos/14504381/pexels-photo-14504381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ownerId: admin.id,
      categoryId: category_entertainment.id,
    },
  });

  const article3 = await prisma.articles.create({
    data: {
      title: 'volutpat sed cras ornare arcu dui vivamus arcu felis bibendum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Congue eu consequat ac felis donec et odio. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Integer eget aliquet nibh praesent tristique. Arcu vitae elementum curabitur vitae. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Nibh tortor id aliquet lectus proin nibh. Nunc sed augue lacus viverra vitae congue. Amet commodo nulla facilisi nullam vehicula ipsum a.',
      coverImage:
        'https://images.pexels.com/photos/9898727/pexels-photo-9898727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ownerId: admin.id,
      categoryId: category_entertainment.id,
    },
  });

  const article4 = await prisma.articles.create({
    data: {
      title: 'volutpat sed cras ornare arcu dui vivamus arcu felis bibendum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Congue eu consequat ac felis donec et odio. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Integer eget aliquet nibh praesent tristique. Arcu vitae elementum curabitur vitae. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Nibh tortor id aliquet lectus proin nibh. Nunc sed augue lacus viverra vitae congue. Amet commodo nulla facilisi nullam vehicula ipsum a.',
      coverImage:
        'https://images.pexels.com/photos/11534490/pexels-photo-11534490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ownerId: admin.id,
      categoryId: category_entertainment.id,
    },
  });

  const article5 = await prisma.articles.create({
    data: {
      title: 'volutpat sed cras ornare arcu dui vivamus arcu felis bibendum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Congue eu consequat ac felis donec et odio. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Integer eget aliquet nibh praesent tristique. Arcu vitae elementum curabitur vitae. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Nibh tortor id aliquet lectus proin nibh. Nunc sed augue lacus viverra vitae congue. Amet commodo nulla facilisi nullam vehicula ipsum a.',
      coverImage:
        'https://images.pexels.com/photos/11743031/pexels-photo-11743031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ownerId: admin.id,
      categoryId: category_entertainment.id,
    },
  });

  const article6 = await prisma.articles.create({
    data: {
      title: 'volutpat sed cras ornare arcu dui vivamus arcu felis bibendum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Congue eu consequat ac felis donec et odio. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Integer eget aliquet nibh praesent tristique. Arcu vitae elementum curabitur vitae. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Nibh tortor id aliquet lectus proin nibh. Nunc sed augue lacus viverra vitae congue. Amet commodo nulla facilisi nullam vehicula ipsum a.',
      coverImage:
        'https://images.pexels.com/photos/15167252/pexels-photo-15167252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ownerId: admin.id,
      categoryId: category_entertainment.id,
    },
  });

  const article7 = await prisma.articles.create({
    data: {
      title: 'volutpat sed cras ornare arcu dui vivamus arcu felis bibendum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Congue eu consequat ac felis donec et odio. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Integer eget aliquet nibh praesent tristique. Arcu vitae elementum curabitur vitae. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Nibh tortor id aliquet lectus proin nibh. Nunc sed augue lacus viverra vitae congue. Amet commodo nulla facilisi nullam vehicula ipsum a.',
      coverImage:
        'https://images.pexels.com/photos/14705351/pexels-photo-14705351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ownerId: admin.id,
      categoryId: category_entertainment.id,
    },
  });

  const article8 = await prisma.articles.create({
    data: {
      title: 'volutpat sed cras ornare arcu dui vivamus arcu felis bibendum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Congue eu consequat ac felis donec et odio. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Integer eget aliquet nibh praesent tristique. Arcu vitae elementum curabitur vitae. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Nibh tortor id aliquet lectus proin nibh. Nunc sed augue lacus viverra vitae congue. Amet commodo nulla facilisi nullam vehicula ipsum a.',
      coverImage:
        'https://images.pexels.com/photos/14892578/pexels-photo-14892578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ownerId: admin.id,
      categoryId: category_entertainment.id,
    },
  });

  const article9 = await prisma.articles.create({
    data: {
      title: 'volutpat sed cras ornare arcu dui vivamus arcu felis bibendum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Congue eu consequat ac felis donec et odio. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Integer eget aliquet nibh praesent tristique. Arcu vitae elementum curabitur vitae. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Nibh tortor id aliquet lectus proin nibh. Nunc sed augue lacus viverra vitae congue. Amet commodo nulla facilisi nullam vehicula ipsum a.',
      coverImage: 'https://images.pexels.com/photos/14694410/pexels-photo-14694410.jpeg',
      ownerId: admin.id,
      categoryId: category_entertainment.id,
    },
  });

  const article10 = await prisma.articles.create({
    data: {
      title: 'volutpat sed cras ornare arcu dui vivamus arcu felis bibendum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Congue eu consequat ac felis donec et odio. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Integer eget aliquet nibh praesent tristique. Arcu vitae elementum curabitur vitae. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Nibh tortor id aliquet lectus proin nibh. Nunc sed augue lacus viverra vitae congue. Amet commodo nulla facilisi nullam vehicula ipsum a.',
      coverImage:
        'https://images.pexels.com/photos/15319373/pexels-photo-15319373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ownerId: admin.id,
      categoryId: category_entertainment.id,
    },
  });

  const handclap1 = await prisma.handclaps.create({
    data: {
      userId: user1.id,
      articleId: article1.id,
      count: 0,
    },
  });

  const adminProfile = await prisma.userProfiles.create({
    data: {
      userId: admin.id,
      icon: 'https://knockknowledge.s3.ap-northeast-2.amazonaws.com/seed/icon-256x256.png',
      coverImage: '',
      name: 'Knock Knowledge.',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Congue eu consequat ac felis donec et odio. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Integer eget aliquet nibh praesent tristique. Arcu vitae elementum curabitur vitae. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Nibh tortor id aliquet lectus proin nibh. Nunc sed augue lacus viverra vitae congue. Amet commodo nulla facilisi nullam vehicula ipsum a.',
      gender: 'M',
      dateOfBirth: new Date('1999-12-12'),
    },
  });

  const userProfile1 = await prisma.userProfiles.create({
    data: {
      userId: user1.id,
      icon: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      coverImage: '',
      name: 'Buford Coleman',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis cras sed felis eget velit aliquet sagittis id consectetur. Lorem sed risus ultricies tristique nulla aliquet. Justo nec ultrices dui sapien eget mi. Sed risus pretium quam vulputate dignissim suspendisse in.',
      gender: 'M',
      dateOfBirth: new Date('1999-12-12'),
    },
  });

  const userProfile2 = await prisma.userProfiles.create({
    data: {
      userId: user2.id,
      icon: 'https://images.unsplash.com/photo-1534299898413-786c624f93eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      coverImage: '',
      name: 'Aurelia Mccann',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis cras sed felis eget velit aliquet sagittis id consectetur. Lorem sed risus ultricies tristique nulla aliquet. Justo nec ultrices dui sapien eget mi. Sed risus pretium quam vulputate dignissim suspendisse in.',
      gender: 'F',
      dateOfBirth: new Date('1999-12-12'),
    },
  });

  const userProfile3 = await prisma.userProfiles.create({
    data: {
      userId: user3.id,
      icon: 'https://images.unsplash.com/photo-1542327897-d73f4005b533?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      coverImage: '',
      name: 'Deandre Mills',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis cras sed felis eget velit aliquet sagittis id consectetur. Lorem sed risus ultricies tristique nulla aliquet. Justo nec ultrices dui sapien eget mi. Sed risus pretium quam vulputate dignissim suspendisse in.',
      gender: 'M',
      dateOfBirth: new Date('1999-12-12'),
    },
  });

  const userProfile4 = await prisma.userProfiles.create({
    data: {
      userId: user4.id,
      icon: 'https://images.unsplash.com/photo-1504051771394-dd2e66b2e08f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      coverImage: '',
      name: 'Mable Richardson',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis cras sed felis eget velit aliquet sagittis id consectetur. Lorem sed risus ultricies tristique nulla aliquet. Justo nec ultrices dui sapien eget mi. Sed risus pretium quam vulputate dignissim suspendisse in.',
      gender: 'F',
      dateOfBirth: new Date('1999-12-12'),
    },
  });

  const userProfile5 = await prisma.userProfiles.create({
    data: {
      userId: user5.id,
      icon: 'https://images.unsplash.com/photo-1512359573855-953710d3f7a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
      coverImage: '',
      name: 'Wilfred Peters',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis cras sed felis eget velit aliquet sagittis id consectetur. Lorem sed risus ultricies tristique nulla aliquet. Justo nec ultrices dui sapien eget mi. Sed risus pretium quam vulputate dignissim suspendisse in.',
      gender: 'M',
      dateOfBirth: new Date('1999-12-12'),
    },
  });

  const userProfile6 = await prisma.userProfiles.create({
    data: {
      userId: user6.id,
      icon: 'https://images.unsplash.com/photo-1554983488-63c80f49078b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      coverImage: '',
      name: 'Todd Howell',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis cras sed felis eget velit aliquet sagittis id consectetur. Lorem sed risus ultricies tristique nulla aliquet. Justo nec ultrices dui sapien eget mi. Sed risus pretium quam vulputate dignissim suspendisse in.',
      gender: 'F',
      dateOfBirth: new Date('1999-12-12'),
    },
  });

  const categoriesProfilesMap = await prisma.categoriesProfilesMap.createMany({
    data: [
      {
        userProfileId: userProfile1.id,
        catrgoryId: category_entertainment.id,
      },
      {
        userProfileId: userProfile2.id,
        catrgoryId: category_lifestyle.id,
      },
      {
        userProfileId: userProfile3.id,
        catrgoryId: category_writing.id,
      },
      {
        userProfileId: userProfile4.id,
        catrgoryId: category_business.id,
      },
      {
        userProfileId: userProfile5.id,
        catrgoryId: category_food.id,
      },
      {
        userProfileId: userProfile6.id,
        catrgoryId: category_entertainment.id,
      },
    ],
  });

  // const reviews1 = await prisma.reviews.create({
  //   data: {
  //     userId: user1.id,
  //     courseId: course1.id,
  //     content:
  //       'Lorem ipsum dolor sit amet augue est diam nulla a sagittis odio. Nibh cras duis fusce est incididunt cursus.',
  //     courseRating: 4,
  //   },
  // });

  const reviews2 = await prisma.reviews.create({
    data: {
      userId: user2.id,
      courseId: course1.id,
      content:
        'Lorem ipsum dolor sit amet augue est diam nulla a sagittis odio. Nibh cras duis fusce est incididunt cursus.',
      courseRating: 5,
    },
  });

  const reviews3 = await prisma.reviews.create({
    data: {
      userId: user3.id,
      courseId: course1.id,
      content:
        'Lorem ipsum dolor sit amet augue est diam nulla a sagittis odio. Nibh cras duis fusce est incididunt cursus.',
      courseRating: 4,
    },
  });

  const reviews4 = await prisma.reviews.create({
    data: {
      userId: user4.id,
      courseId: course1.id,
      content:
        'Lorem ipsum dolor sit amet augue est diam nulla a sagittis odio. Nibh cras duis fusce est incididunt cursus.',
      courseRating: 3,
    },
  });

  const reviews5 = await prisma.reviews.create({
    data: {
      userId: user5.id,
      courseId: course2.id,
      content:
        'Lorem ipsum dolor sit amet augue est diam nulla a sagittis odio. Nibh cras duis fusce est incididunt cursus.',
      courseRating: 5,
    },
  });

  const reviews6 = await prisma.reviews.create({
    data: {
      userId: user6.id,
      courseId: course2.id,
      content:
        'Lorem ipsum dolor sit amet augue est diam nulla a sagittis odio. Nibh cras duis fusce est incididunt cursus.',
      courseRating: 4,
    },
  });

  const post1 = await prisma.posts.create({
    data: {
      userId: user1.id,
      courseId: course1.id,
      content: 'deployyyyy',
    },
  });

  const coupon1 = await prisma.coupons.create({
    data: {
      promocode: 'tecky50',
      name: 'newUser',
      discountAmount: 50,
      quantity: 100,
      startAt: new Date('1999-1-1'),
      endAt: new Date('3333-1-1'),
    },
  });

  // const courseOrder1 = await prisma.courseOrders.create({
  //   data: {
  //     userId: user1.id,
  //     paymentMethod: 'master',
  //     redeemCouponId: redeemCoupon1.id,
  //     totalAmount: 10000,
  //   },
  // });

  // const courseOrderDetail1 = await prisma.courseOrderDetails.create({
  //   data: {
  //     courseOrderId: courseOrder1.id,
  //     courseId: course1.id,
  //     course_price: 10000,
  //   },
  // });

  // const shoppingCart1 = await prisma.shoppingCarts.create({
  //   data: {
  //     userId: user1.id,
  //     courseId: course1.id,
  //   },
  // });

  const bookMark1 = await prisma.bookMarks.create({
    data: {
      userId: user1.id,
      courseId: course1.id,
      articleId: article1.id,
    },
  });

  const announcementsContent1 = await prisma.announcementsContents.create({
    data: {
      tag: 'private',
      title: 'deploy docker',
      content: 'docker!!!!!!',
      courseId: course1.id,
    },
  });

  const announcement1 = await prisma.announcements.create({
    data: {
      announcementContentId: announcementsContent1.id,
      toUserId: user1.id,
      fromUserId: admin.id,
    },
  });

  await prisma.coupons.create({
    data: {
      promocode: 'deployDocker',
      name: '1year',
      discountAmount: 50,
      quantity: 100,
      startAt: new Date('2020-01,01'),
      endAt: new Date('2027-01,01'),
      isActive: true,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
