Barba.Pjax.start();
Barba.Prefetch.init();

var BasicTransition = Barba.BaseTransition.extend({
	start: function() {
		$('body').removeClass('blogbar');
		$('body').removeClass('contactmodal');

		if ( !$('body').hasClass('loading') ) {
			$('body').addClass('loading');
		}

		var that = this;
		setTimeout(function() {
			that.newContainerLoading.then(that.finish.bind(that));
		}, 400);
	},
	finish: function() {
		$('body').removeClass('loading');
		this.done();
		if ( $('.wrapper').data('type') ) {
			$('html').attr('data-type', $('.wrapper').data('type'));
		} else {
			$('html').attr('data-type', 'default');
		}
		
	}
});

Barba.Pjax.getTransition = function() {
	return BasicTransition;
};

$('.menu__nav--contact a').on('click', function(e) {
	e.preventDefault();
	$('body').removeClass('blogbar');
	if ( !$('body').hasClass('contactmodal') ) {
		$('body').addClass('contactmodal');
	} else {
		$('body').removeClass('contactmodal');
	}
});

$('.close-contactmodal').on('click', function(e) {
	e.preventDefault();
	$('body').removeClass('contactmodal');
});

$('.taskbar__blog-btn').on('click', function(e) {
	e.preventDefault();
	$('body').removeClass('contactmodal');
	if ( !$('body').hasClass('blogbar') ) {
		$('body').addClass('blogbar');
	} else {
		$('body').removeClass('blogbar');
	}
});

$('.close-blogbar').on('click', function(e) {
	e.preventDefault();
	$('body').removeClass('blogbar');
});

$('.taskbar__blog-list ul li a').on('click', function(e) {
	e.preventDefault();
});

$('.taskbar__blog-list ul li').on('mouseenter mouseleave', function(e) {
    direction = getDir($(this), {x: e.pageX, y: e.pageY});

    // 0 == top
    // 1 == right
    // 2 == bottom
    // 4 == left

    if ( $(this).attr('class') == '' || $(this).attr('class') == undefined ) {
    	$('.bg', this).addClass( 'init-' + direction );
    }

    $(this).attr('class', '');

    if (e.type === 'mouseenter') {
        $(this).addClass( 'in-' + direction );
    } else {
    	$(this).addClass( 'out-' + direction );
        //this._hideHover();
    }
});

function getDir(el, coordinates) {
    var w = el.outerWidth(),
        h = el.outerHeight(),
        // calculate the x and y to get an angle to the center of the div from that x and y.
        // gets the x value relative to the center of the DIV and "normalize" it
        x = (coordinates.x - el.offset().left - (w / 2)) * (w > h ? (h / w) : 1),
        y = (coordinates.y - el.offset().top - (h / 2)) * (h > w ? (w / h) : 1),
        // the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);
        // first calculate the angle of the point,
        // add 180 deg to get rid of the negative values
        // divide by 90 to get the quadrant
        // add 3 and do a modulo by 4 to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
        direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;

     return direction;
};




/*
function getPageId(n) {
	return 'article-page-' + n;
}

function getDocumentHeight(articleList) {
	return Math.max(
		articleList.scrollHeight, articleList.offsetHeight, articleList.clientHeight
	);
};

function getArticleImage() {
	const hash = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
	const image = new Image;
	image.className = 'article-list__item__image article-list__item__image--loading';
	image.src = 'http://api.adorable.io/avatars/250/' + hash;
	
	image.onload = function() {
		image.classList.remove('article-list__item__image--loading');
	};
	
	return image;
}

function getArticle() {
	const articleImage = getArticleImage();
	const article = document.createElement('li');
	article.className = 'article-list__item';
	article.setAttribute("style", "background-image:url(" + articleImage.src + ");");
	
	return article;
}

function getArticlePage(page, articlesPerPage = 16) {
	const pageElement = document.createElement('ul');
	pageElement.id = getPageId(page);
	pageElement.className = 'article-list__page';
	
	//while (articlesPerPage--) {
	//	pageElement.appendChild(getArticle());
	//}

	desturl = articleListPagination.getAttribute('data-url');

	$.ajax({
        url: desturl,
        dataType: 'html',
        complete: function(jqXHR, textStatus) {
            condition = (typeof (jqXHR.isResolved) !== 'undefined') ? (jqXHR.isResolved()) : (textStatus === 'success' || textStatus === 'notmodified');

            console.log(jqXHR);
            if (condition) {

                data = '<div>' + jqXHR.responseText + '</div>';
                data = $(data).find("#list li a").text();
                console.log(data);
            } else {
                //error
            }
        }
    });
	
	return pageElement;
}

function addPaginationPage(page) {
	const pageLink = document.createElement('a');
	pageLink.href = '#' + getPageId(page);
	pageLink.innerHTML = page;
	
	const listItem = document.createElement('li');
	listItem.className = 'article-list__pagination__item';
	listItem.appendChild(pageLink);
	
	articleListPagination.appendChild(listItem);
	
	if (page === 2) {
		articleListPagination.classList.remove('article-list__pagination--inactive');
	}
}

function fetchPage(page) {
	articleList.appendChild(getArticlePage(page));
}

function addPage(page) {
	fetchPage(page);
	addPaginationPage(page);
}

const articleList = document.getElementById('taskbar__blog-list');
const articleWrap = document.getElementById('taskbar__blog-list-wrap');
const articleListPagination = document.getElementById('article-list-pagination');
let page = 0;

addPage(++page);

articleWrap.onscroll = function() {
	if (articleWrap.scrollTop < getDocumentHeight(articleList) - articleWrap.offsetHeight) return;
	addPage(++page);
};
*/