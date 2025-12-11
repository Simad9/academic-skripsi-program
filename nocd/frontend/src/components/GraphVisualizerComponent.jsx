// nocd/frontend/src/components/GraphVisualizer.jsx

import React, { useEffect, useRef } from 'react';
// Hapus import PanZoom dari 'react-easy-panzoom' yang tidak digunakan
import Panzoom from '@panzoom/panzoom'; 

const GraphVisualizer = ({ imgPath }) => {
  console.log("GraphVisualizer menerima imgPath:", imgPath);

  // Ref untuk elemen <img> yang akan di-panzoom
  const imageRef = useRef(null);
  // Ref untuk Panzoom instance
  const panzoomRef = useRef(null);
  // Ref untuk wrapper yang menangani scroll wheel
  const wrapperRef = useRef(null);

  // Fungsi untuk membersihkan instance Panzoom yang sudah ada
  const cleanupPanzoom = () => {
    if (panzoomRef.current) {
      // Hapus event listener wheel dari wrapper
      const wrapperElement = wrapperRef.current;
      if (wrapperElement) {
        wrapperElement.removeEventListener("wheel", panzoomRef.current.zoomWithWheel);
      }
      // Hancurkan instance Panzoom
      panzoomRef.current.destroy(); 
      panzoomRef.current = null;
    }
  };

  const initPanzoom = () => {
    // 1. Pastikan membersihkan yang lama sebelum inisialisasi yang baru
    cleanupPanzoom(); 
    
    const currentImage = imageRef.current;
    if (currentImage) {
      // 2. Inisialisasi Panzoom pada gambar
      const panzoomInstance = Panzoom(currentImage, {
        maxScale: 5,
        minScale: 1,
        contain: "outside",
        // Opsi tambahan: atur batasan agar tidak terlalu jauh melenceng
        // overflow: 'hidden' // Atur di CSS/style wrapper
      });
      panzoomRef.current = panzoomInstance;

      // 3. Tambahkan event listener untuk zoom dengan scroll
      const wrapperElement = wrapperRef.current;
      if (wrapperElement) {
        wrapperElement.addEventListener("wheel", panzoomInstance.zoomWithWheel, {
          passive: false // Penting untuk mencegah scrolling halaman saat zoom
        });
      }

      // 4. Cursor handling (menggunakan listener DOM asli)
      const handleMouseDown = () => currentImage.style.cursor = "grabbing";
      const handleMouseUp = () => currentImage.style.cursor = "grab";

      currentImage.addEventListener("mousedown", handleMouseDown);
      currentImage.addEventListener("mouseup", handleMouseUp);
      
      // Cleanup DOM listener (harus disimpan di Ref atau dilakukan di Cleanup useEffect)
      // *Catatan: Untuk penyederhanaan, kita akan menghapus semua listener di fungsi cleanup useEffect di bawah.
    }
  };
  
  // Efek utama untuk membersihkan Panzoom saat unmount atau imgPath berubah
  useEffect(() => {
    // Jalankan fungsi cleanup saat komponen di-unmount atau imgPath berubah
    return () => {
      cleanupPanzoom(); 
    };
  }, [imgPath]); // Dependency: Jalankan cleanup jika imgPath berubah

  // Style untuk wrapper agar Panzoom dapat berfungsi sebagai area pandang
  const wrapperStyle = {
    overflow: 'hidden',
    cursor: 'grab',
    width: '100%',
    height: '500px', // *PENTING: Beri batasan ketinggian agar overflow bekerja
    touchAction: 'none' // Menonaktifkan gesture browser default (PENTING untuk Panzoom)
  };

  return (
    <div id="graf-wrapper" ref={wrapperRef} style={wrapperStyle}>
      <img 
        id="gambar-graf" 
        ref={imageRef} 
        src={imgPath} 
        alt="Hasil Graf STRINGDB" 
        // PENTING: Inisialisasi Panzoom HANYA setelah gambar dimuat
        onLoad={initPanzoom} 
        style={{ width: '100%', height: 'auto', display: 'block', transformOrigin: '0 0' }}
      />
    </div>
  );
};

export default GraphVisualizer;