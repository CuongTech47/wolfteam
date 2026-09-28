(() => {
  document.title = 'X3W.VN — We Will Win';
  document.querySelector('meta[name="description"]')?.setAttribute('content', 'X3W.VN phát triển game với mục tiêu tạo ra sản phẩm tốt cho người chơi. We Will Win — cùng tiến về phía trước trên con đường đã chọn.');
  document.querySelectorAll('.logo').forEach(logo => {
    logo.innerHTML = '<span class="logo-mark">X</span><span class="brand-x3w">X3W<span><em>.VN</em></span></span>';
  });

  document.querySelector('#home').innerHTML = `
    <section class="x3w-hero"><div class="shell"><div class="hero-content">
      <div class="eyebrow">X3W.VN · WE WILL WIN</div>
      <h1>Làm tốt điều trước mắt. <span>Tiến về điều mình tin.</span></h1>
      <p class="lead">Với chúng tôi, “win” bắt đầu từ việc làm ra một sản phẩm xứng đáng với thời gian và sự tin tưởng của người chơi. Chúng tôi sẽ lắng nghe phản hồi và liên tục hoàn thiện sản phẩm của mình.</p>
      <div class="cta-row"><button class="btn primary" data-route="company">Tìm hiểu về X3W.VN</button><button class="btn outline" data-route="game">Xem sản phẩm</button></div>
      <div class="x3w-tagline">Ba chữ W. Một niềm tin: We Will Win.</div>
    </div></div></section>
    <section class="section white"><div class="shell x3w-story"><div class="monogram">WWW<small>X3W → WWW</small></div><div>
      <div class="eyebrow">Ý nghĩa tên gọi</div><h2>We Will Win</h2>
      <p>X3W gợi đến ba chữ W trong “We Will Win”. Câu nói ấy vừa nhắc chúng tôi về trách nhiệm với sản phẩm mình tạo ra, vừa mang một ý nghĩa rộng hơn.</p>
      <p>“We Will Win” còn là niềm tin dành cho mỗi người trong cộng đồng: không phải ai cũng chọn cùng một con đường hay định nghĩa thành công giống nhau. Nhưng khi nghiêm túc với điều mình chọn và bền bỉ tiến lên, chúng ta có thể đến gần hơn với mục tiêu của mình.</p>
      <div class="x3w-values"><div><strong>Làm sản phẩm tốt</strong><span>Chất lượng trải nghiệm là mục tiêu gần nhất.</span></div><div><strong>Lắng nghe người chơi</strong><span>Phản hồi thực tế giúp sản phẩm tốt hơn.</span></div><div><strong>Đi đường dài</strong><span>Cải thiện liên tục, không dừng ở ngày ra mắt.</span></div></div>
    </div></div></section>
    <section class="section"><div class="shell split"><div class="game-art">HÌNH ẢNH GAME · CHỜ TƯ LIỆU CHÍNH THỨC</div><div><div class="eyebrow">Sản phẩm đang chuẩn bị phát hành</div><h2>Game đầu tiên của chúng tôi</h2><p>Một trang riêng sẽ giới thiệu nội dung, hình ảnh thật, phân loại độ tuổi và kênh hỗ trợ khi các thông tin được chốt.</p><span class="pill">Dự kiến 18+ · Chờ kết quả phân loại</span><div class="cta-row"><button class="btn" data-route="game">Xem trang game</button><button class="btn" data-route="payment">Cổng nạp minh họa</button></div></div></div></section>
    <section class="section white"><div class="shell"><div class="eyebrow">Thông tin chính thức</div><h2>Thông báo quan trọng</h2><div class="notice-card"><div><strong>Chưa có thông báo</strong><p>Thông tin phát hành và vận hành sẽ được cập nhật tại đây.</p></div><button class="btn" data-route="notice">Xem thông báo</button></div></div></section>`;

  document.querySelector('#company').innerHTML = `
    <div class="shell"><div class="page-head"><div class="eyebrow">Về X3W.VN</div><h1>Đi cùng nhau, làm tốt việc trước mắt.</h1><p>X3W.VN đang phát triển sản phẩm game đầu tiên. Đây là nơi chúng tôi giới thiệu cách mình nghĩ về sản phẩm và con đường phía trước.</p></div>
    <div class="x3w-company-intro"><div class="eyebrow">X3W → WWW</div><h2>X3W.VN — We Will Win</h2><p>Với chúng tôi, “win” bắt đầu từ việc làm ra một sản phẩm xứng đáng với thời gian và sự tin tưởng của người chơi. Chúng tôi sẽ lắng nghe phản hồi và liên tục hoàn thiện sản phẩm của mình.</p><p>“We Will Win” còn là niềm tin dành cho mỗi người trong cộng đồng: không phải ai cũng chọn cùng một con đường hay định nghĩa thành công giống nhau. Nhưng khi nghiêm túc với điều mình chọn và bền bỉ tiến lên, chúng ta có thể đến gần hơn với mục tiêu của mình.</p></div>
    <div class="x3w-company-statement"><p>Chúng ta sẽ đạt được những điều mình hướng đến — bằng việc nghiêm túc với từng bước đi hôm nay.</p></div>
    <div class="x3w-company-columns"><div class="panel"><h3>Chúng tôi đang làm gì?</h3><p>Phát triển và chuẩn bị phát hành game. Sản phẩm, hình ảnh và các thông tin dịch vụ sẽ được công bố theo tiến độ thực tế.</p></div><div class="panel"><h3>Chúng tôi chọn cách làm nào?</h3><p>Đặt chất lượng sản phẩm và phản hồi người chơi vào quá trình phát triển, kiểm tra và cải thiện liên tục.</p></div></div>
    <div class="x3w-legal">X3W.VN là tên thương hiệu được dùng trong bản giới thiệu này. Tên pháp nhân, địa chỉ, liên hệ và thông tin giấy phép sẽ được cập nhật theo giấy tờ chính thức.</div><div style="height:55px"></div></div>`;

  const footerName = document.querySelector('.footer strong');
  if (footerName) footerName.textContent = 'X3W.VN';
  const footerText = document.querySelector('.footer p');
  if (footerText) footerText.textContent = 'Thông tin pháp nhân, địa chỉ và liên hệ: chờ cập nhật chính thức';
})();
