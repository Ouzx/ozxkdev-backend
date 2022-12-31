export default `<style>
  body {
    max-width: 90%;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .link-tool-card {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    padding: 1rem;
    text-decoration: none;
    color: #000;
    background: #fff;
    border: 1px solid rgba(201, 201, 204, 0.48);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    will-change: filter;
    animation: link-in 450ms 1 cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .link-tool-card:hover {
    cursor: pointer;
    color: #000;
  }

  .link-tool-main,
  .link-image-wrapper {
    display: flex;
  }

  .link-image-wrapper {
    align-content: center;
    justify-content: center;
  }

  .link-image-wrapper .link-img-bg {
    width: 33px;
    height: 33px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 3px;
  }
  .link-tool-main {
    flex: 3;
  }
  .link-image-wrapper {
    flex: 1;
  }
  .link-tool-main p {
    display: block;
    width: 100%;
  }
  .tl-title {
    font-size: 17px;
    font-weight: bold;
    line-height: 1.5em;
    margin: 0 0 10px 0;
  }
  .tl-description {
    margin: 0 0 20px 0;
    font-size: 15px;
    line-height: 1.55em;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .tl-link {
    color: #888;
  }

  @media (min-width: 600px) {
    .link-image-wrapper .link-img-bg {
      width: 40px !important;
      height: 40px !important;
    }
    .link-tool-main {
      flex: 4;
    }
  }

  @media (min-width: 900px) {
    .link-image-wrapper .link-img-bg {
      width: 60px !important;
      height: 60px !important;
    }
    .link-tool-main {
      flex: 5;
    }
  }

  @media (min-width: 1200px) {
    .link-image-wrapper .link-img-bg {
      width: 90px !important;
      height: 90px !important;
    }
    .link-tool-main {
      flex: 6;
    }
  }

  @media (min-width: 1600px) {
    .link-image-wrapper .link-img-bg {
      width: 100px !important;
      height: 100px !important;
    }
    .link-tool-main {
      flex: 7;
    }
  }
</style>`;
