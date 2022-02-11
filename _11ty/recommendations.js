module.exports = (rec = '') => (`
<section class="container mb-4">
    <div class="card card--rec">
      <div class="card__header">
        <h2 class="card__headline">Weiterführende Links</h2>
      </div>
      <div class="card__body">
        ${ rec }
      </div>
    </div>
</section>
`);
