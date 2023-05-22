$(function ()
{
  let spinningLoaderAnimation;
  var delayAmount = 1000;
  var durationAmount = 1000;

  function showMailSpinner(isActive)
  {
    if (isActive)
    {
      $("#spinning-loading-parent").show();
      spinningLoaderAnimation.forEach((a) =>
      {
        a.restart();
      });
    } else
    {
      $("#spinning-loading-parent").hide();
      spinningLoaderAnimation.forEach((a) =>
      {
        a.pause();
      });
    }
  }

  function setupVisuals()
  {
    // Convert paragraphs into spans for animating
    const textWrappers = $(".contains-text");

    for (let index = 0; index < textWrappers.length; index++)
    {
      const element = $(textWrappers[ index ]);
      const imagesHTML = element.children(".icons");
      if (imagesHTML.length > 0)
      {
        element.parent().append(imagesHTML);
      }

      element.html(element.text().replace(/(\S+)/g, "<span class='anime-word'>$&</span>"));

      if (imagesHTML.length > 0)
      {
        element.append('<div class="w-100"/>');
        element.append(imagesHTML);
      }
    }

    const words = document.getElementsByClassName("anime-word");

    // Grab a few special spans to keep colorizing.
    const wordsToEmphasis = [];
    const importantStrings = [ "edmund.", "interactive", "code.", "plugins,", "games,", "tools,", "websites,", "apps,", "contact", "helping", "others", "software", "engineer" ];

    for (let index = 0; index < words.length; index++)
    {
      const element = words[ index ];
      if (importantStrings.includes(element.innerText.toLowerCase()))
      {
        wordsToEmphasis.push(element);
      }
    }

    function hoverOver(e)
    {
      if (!e)
      {
        return;
      }
      const d = new Date();
      const huedelta = Math.round(360 * (1 + Math.sin(d.getTime() * 0.0007) / 2));

      if (e.target === undefined)
      {
        e.style.color = "#000000";
        e.style.background = "hsl(" + huedelta + ", 100%, 65%)";
      } else
      {
        anime.remove(e.target);
        e.target.style.color = "#000000";
        e.target.style.background = "hsl(" + huedelta + ", 100%, 65%)";
      }
    }

    function hoverOff(e)
    {
      if (!e)
      {
        return;
      }
      anime({
        targets: e.target,
        background: [
          { value: "#000000", delay: delayAmount, duration: durationAmount },
          { value: "#000000", delay: delayAmount, duration: durationAmount },
        ],
        color: [
          { value: "#FFFFFF", delay: delayAmount, duration: durationAmount },
          { value: "#FFFFFF", delay: delayAmount, duration: durationAmount },
        ],
        easing: "easeInBounce",
        complete: () =>
        {
          if (e.target === null || e.target === undefined)
          {
            return;
          }

          e.target.style.background = "";
          e.target.style.color = "";
        },
      });
    }

    for (let index = 0; index < wordsToEmphasis.length; index++)
    {
      setTimeout(() =>
      {
        const element = wordsToEmphasis[ index ];
        hoverOver(element);
      }, 150 * index);
    }

    for (let i = 0; i < words.length; i++)
    {
      $(words[ i ]).hover(hoverOver, hoverOff);
    }

    // start loading animations
    spinningLoaderAnimation = [
      anime({
        targets: ".loader",
        rotate: 180,
        autoplay: false,
        duration: 2000,
        loop: true,
        elasticity: 500,
        easing: "easeOutElastic",
        delay: 1000,
      }),
      anime({
        targets: ".line",
        width: "3rem",
        autoplay: false,
        duration: 4000,
        loop: true,
        begin: () =>
        {
          $(".line").width(0);
        },
        direction: "alternate",
        delay: function (el, index)
        {
          return index * 2000;
        },
      }),
    ];
    showMailSpinner(false);



    // anime({
    //   targets: ".bg-text",
    //   translateX: "50vw",
    //   duration: 10000,
    //   loop: true,
    //   direction: 'alternate',
    //   easing: 'easeInOutSine'
    // });

  }

  function setupInput()
  {
    const form = $("form[name='contact-me-form']");
    let validator;

    function validateForm()
    {
      validator = form.validate({
        rules: {
          name: "required",
          message: "required",
          email: {
            required: true,
            email: true,
          },
        },
        messages: {
          name: "Please enter your name",
          email: "Please enter a valid email address",
          message: "Please enter a message",
        },
      });
    }

    function onSendForm()
    {
      anime({
        targets: ".contact-me-button",
        translateX: 100,
        duration: 100,
        easing: "cubicBezier(.5, .05, .1, .3)",
        direction: "alternate",
      });

      validateForm();

      if (!form.valid())
      {
        $("#infoModal").modal("show");
        $(".modal-title").text("Failed to send message.");
        $(".modal-body").text(validator.numberOfInvalids() + " field(s) are invalid");
        return;
      }

      showMailSpinner(true);
      $(".contact-me-form").height(0);

      anime({
        targets: ".contact-me-form",
        translateX: 10000,
        delay: 100,
        duration: 500,
        endDelay: 800,
        easing: "cubicBezier(.5, .05, .1, .3)",
      });

      const formArray = form.serializeArray();
      let formJSON = {};
      $(formArray).each(function (index, obj)
      {
        formJSON[ obj.name ] = obj.value;
      });
      formJSON = JSON.stringify(formJSON);

      $.post({
        url: "/send-contact-form",
        data: formJSON,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 7000,
        success: (response) =>
        {
          showMailSpinner(false);
          $(".contact-me-form").height("100%");

          $("#infoModal").modal("show");
          $(".modal-title").text("Done.");
          $(".modal-body").text("Thank you, your message has been sent.");
          form[ 0 ].reset();

          anime({
            targets: ".contact-me-form",
            translateX: 0,
            delay: 100,
            duration: 500,
            endDelay: 800,
            easing: "cubicBezier(.5, .05, .1, .3)",
          });
        },
        error: (response, status, error) =>
        {
          showMailSpinner(false);
          $(".contact-me-form").height("100%");

          anime({
            targets: ".contact-me-form",
            translateX: 0,
            delay: 100,
            duration: 500,
            endDelay: 800,
            easing: "cubicBezier(.5, .05, .1, .3)",
          });

          $("#infoModal").modal("show");
          $(".modal-title").text("Uh oh.");

          if (status === "timeout")
          {
            $(".modal-body").text("You message might have been lost in transit - please consider contacting me directly: dao.edmund@gmail.com");
            return;
          }

          $(".modal-body").text("Something went wrong, please contacting me directly via edmunddao@gmail.com");

          console.log("error sending email ", response, status, error);
        },
      });
    }

    $(".close-modal-button").on("click", () =>
    {
      $("#infoModal").modal("hide");
    });
    $(".contact-me-button").on("click", onSendForm);
    $(document).keyup(validateForm);
  }

  setupVisuals();
  setupInput();
});
