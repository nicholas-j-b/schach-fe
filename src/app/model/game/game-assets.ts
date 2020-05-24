import { Piece } from './piece';

export class GameAssets {
    static readonly assetBasePath = './assets/images/';
    public static images = new Map<string, HTMLImageElement>();

    public static readInImages(pieces: Piece[]) {
        for (const piece of pieces) {
            const pieceKey = GameAssets.formulatePieceKey(piece);
            if (!GameAssets.images.get(pieceKey)) {
                const image = new Image();
                image.src = GameAssets.formulateAssetPath(piece.colour, piece.pieceName);
                GameAssets.images.set(pieceKey, image);
            }
        }
    }

    private static formulatePieceKey(piece: Piece) {
        return piece.colour + piece.pieceName;
    }

    private static formulateAssetPath(colour, pieceName) {
        return `${GameAssets.assetBasePath}${colour}-${pieceName}.png`;
    }
}
