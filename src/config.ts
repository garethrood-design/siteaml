export interface GalleryItem {
  url: string;
  type: 'image' | 'video';
}

export const siteConfig = {
  model: {
    name: 'Amelia Martins',
    profileImage: 'https://console-typebot-minio.kjufc9.easypanel.host/api/v1/buckets/hot-mj/objects/download?preview=true&prefix=little-1.jpg&version_id=null',
    coverImage: 'https://console-typebot-minio.kjufc9.easypanel.host/api/v1/buckets/hot-mj/objects/download?preview=true&prefix=little-p10.jpg&version_id=null',
    bio: 'Oii meus amores, uma pequena prévia pra vocês mostrando um pouco do meu mundinho vip, aproveitem bastante! Caso queirem acessar mais fundo nesse mundo colorido é só clicar no botão em baixo do aúdio!',
  },

  gallery: [
    { url: 'https://console-typebot-minio.kjufc9.easypanel.host/api/v1/buckets/hot-mj/objects/download?preview=true&prefix=little-p1.mp4&version_id=null', type: 'video' },
    { url: 'https://console-typebot-minio.kjufc9.easypanel.host/api/v1/buckets/hot-mj/objects/download?preview=true&prefix=little-p2.mp4&version_id=null', type: 'video' },
    { url: 'https://console-typebot-minio.kjufc9.easypanel.host/api/v1/buckets/hot-mj/objects/download?preview=true&prefix=little-p3.mp4&version_id=null', type: 'video' },
    { url: 'https://console-typebot-minio.kjufc9.easypanel.host/api/v1/buckets/hot-mj/objects/download?preview=true&prefix=little-p4.mp4&version_id=null', type: 'video' },
    { url: 'https://console-typebot-minio.kjufc9.easypanel.host/api/v1/buckets/hot-mj/objects/download?preview=true&prefix=little-p5.jpg&version_id=null', type: 'image' },
    { url: 'https://console-typebot-minio.kjufc9.easypanel.host/api/v1/buckets/hot-mj/objects/download?preview=true&prefix=little-p6.jpg&version_id=null', type: 'image' },
    { url: 'https://console-typebot-minio.kjufc9.easypanel.host/api/v1/buckets/hot-mj/objects/download?preview=true&prefix=little-p7.jpg&version_id=null', type: 'image' },
    { url: 'https://console-typebot-minio.kjufc9.easypanel.host/api/v1/buckets/hot-mj/objects/download?preview=true&prefix=little-p8.jpg&version_id=null', type: 'image' },
  ] as GalleryItem[],

  pricing: {
    content: {
      price: 10,
      videoCount: 25,
      categories: ['Fotos exclusivas', 'Vídeos premium', 'Conteúdo personalizado'],
      benefits: [
        'Acesso completo à galeria',
        '25+ vídeos exclusivos',
        'Conteúdo atualizado semanalmente',
        'Acesso vitalício'
      ],
    },
    videoCall: {
      price: 30,
      duration: 10,
      benefits: [
        'Chamada de vídeo privada',
        '10 minutos de duração',
        'Interação ao vivo',
        'Conteúdo personalizado durante a chamada'
      ],
    },
  },
};
